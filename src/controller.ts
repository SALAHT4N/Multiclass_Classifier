import "./style.css";
import { ChartView } from "./views/ChartView";
import state from "./models/State";
import { Point } from "./models/Point";
import { Network } from "./models/Network";
import { Layer } from "./models/Layer";

const chart: ChartView = new ChartView();

function onClickChartHandler(point: Point) {
  point.group = state.currentSelectedGroup;
  state.chartState.addPoint(point);
}

function buildNetwork(): Network {
  return Network.getBuilder()
    .setInputLayer(2)
    .setOutputLayer((x) => x, 4)
    .addHiddenLayer((x) => x, 3)
    .build();
}

function captureDataset(): void {
  // update data in model to reflect the dataset input by the user
}

function train(): void {
  // 1. iterate through the dataset line by line
  // 2. activate layers, layer by layer starting from input to output
  /**
   * Input neuron activations are just the input themselves
   * Hidden neurons activations are the weighted sum plugged into an activation function
   * Output neurons same as hidden ones
   */
  // 3.calculate the error and start back propagating
  /**
   * Output neurons error calculation is the difference between actual and desired outputs
   * Hidden neurons error calculation is the effect on further layers
   * Input layer, no back propagation
   */
  // 4. update old weights and thresholds to the new calculated values
}

function classify(): void {
  // try points to determine their output values
}

function init(): void {
  chart.addOnClickEventListener(onClickChartHandler);
  state.chartState.addListener(chart.updateChart);
}

init();

const network = buildNetwork();

network.initialize();

captureDataset();

network.train([[]], (dataset, outputLayer, hiddenLayers) =>
  console.log(dataset)
);

classify();
