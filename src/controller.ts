import "./style.css";
import { ChartView } from "./views/ChartView";
import state from "./models/State";
import { Point } from "./models/Point";
import { Network } from "./models/Network";

const chart: ChartView = new ChartView();

function onClickChartHandler(point: Point) {
  point.group = state.currentSelectedGroup;
  state.dataModel.addPoint(point);
}

/**
 * This method constructs the neural network used to classify dataset
 * @returns Constructed Neural Network
 */
function buildNetwork(): Network {
  return Network.getBuilder()
    .setNumberOfFeatures(2)
    .addHiddenLayer(
      (x) => x,
      (x) => 1,
      3
    )
    .setOutputLayer(
      (x) => x,
      (x) => 1,
      4
    );
}

/**
 * This method formats the points to input samples
 * @returns Input samples for neural network
 */
function formatDataset(): number[][] {
  const ACTIVE_OUTPUT = 1;
  const INACTIVE_OUTPUT = 0;

  const formattedDataset = state.dataModel.getPoints().map((point) => {
    const sample = [point.x, point.y];

    state.dataModel.getGroups().forEach(() => sample.push(0));
    const groups = state.dataModel.getGroups();

    for (let group of groups) {
      if (point.group === group) {
        sample.push(ACTIVE_OUTPUT);
      } else {
        sample.push(INACTIVE_OUTPUT);
      }
    }

    return sample;
  });

  return formattedDataset;
}

function train(): void {}

function classify(): void {
  // try points to determine their output values
}

function init(): void {
  chart.addOnClickEventListener(onClickChartHandler);
  state.dataModel.addListener(chart.addPoint);
}

init();

const network = buildNetwork();
network.initialize();

const dataset = formatDataset();

network.train(dataset, (dataset, network) => console.log(dataset));

classify();
