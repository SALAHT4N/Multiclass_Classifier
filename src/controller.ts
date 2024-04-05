import "./style.css";
import { ChartView } from "./views/ChartView";
import state from "./models/State";
import { Group, Point } from "./models/Point";
import { Network } from "./models/Network";
import { gradientDescent } from "./models/trainingAlgorithms";
import {
  linear,
  linearDerivative,
  sigmoid,
  sigmoidDerivative,
  softmax,
  softmaxDerivative,
} from "./models/ActivationFunctions";
import {
  addClearButtonClickedHandler,
  addDecrementBtnHandler,
  addIncrementBtnHandler,
  addSelectGroupsHasChangedHandler,
  addStartButtonClickedHandler,
  clearStartButtonToggle,
  getLearningAlgorithmParamters,
  updateSelectGroupsInput,
} from "./views/ControlsView";

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
    .addHiddenLayer(linear, linearDerivative, 3)
    .setOutputLayer(softmax, softmaxDerivative, 2);
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

function IncrementBtnClickedHandler() {
  try {
    const addedGroup = state.dataModel.addGroup();
    chart.addDataset(addedGroup);
    updateSelectGroupsInput(state.dataModel.getGroups());
    state.currentSelectedGroup = state.dataModel.getGroups()[0];
  } catch (e) {
    alert((e as Error).message);
  }
}

function DecrementBtnClickedHandler() {
  try {
    const deletedGroup = state.dataModel.removeGroup();
    chart.removeDataset(deletedGroup);
    state.dataModel.removePoints(deletedGroup);
    updateSelectGroupsInput(state.dataModel.getGroups());
    state.currentSelectedGroup = state.dataModel.getGroups()[0];
  } catch (e) {
    alert((e as Error).message);
  }
}

function selectedGroupChangedHandler(group: Group) {
  state.currentSelectedGroup = group;
}

function startButtonClickedHandler(): void {
  clearStartButtonToggle();

  const ps = getLearningAlgorithmParamters();

  //Start the learn algorithm

  const shadowDatasets = chart.getShadowDataset();

  for (let i = 0; i <= 100; i = i + 1.5) {
    for (let j = 0; j <= 100; j = j + 1.2) {
      shadowDatasets[`Group 1 Shadow`].data.push([j, i]);
    }
  }

  chart.updateChart();
  // const intId = setInterval(() => {
  //   if (x > 100) {
  //     x = 0;
  //     y = y + 0.5;
  //   }
  //   if (y > 100) {
  //     clearInterval(intId);
  //     chart.updateChart();
  //   }

  //   shadowDatasets["Group 1 Shadow"].data.push([x, y]);

  //   x = x + 0.5;
  // }, 10);
}

function clearButtonClickedHandler() {
  chart.clearChart();
  clearStartButtonToggle();
}

function init(): void {
  try {
    chart.addOnClickEventListener(onClickChartHandler);
    addIncrementBtnHandler(IncrementBtnClickedHandler);
    addDecrementBtnHandler(DecrementBtnClickedHandler);
    addSelectGroupsHasChangedHandler(selectedGroupChangedHandler);
    state.dataModel.addListener(chart.addPoint);
    addStartButtonClickedHandler(startButtonClickedHandler);
    addClearButtonClickedHandler(clearButtonClickedHandler);
  } catch (e) {
    alert((e as Error).message);
  }
}

init();

const network = buildNetwork();
network.initialize();

const dataset = formatDataset();

// console.log(dataset);
console.log(JSON.parse(JSON.stringify(network)) as Network);
network.train(dataset, gradientDescent);
classify();
console.log(`input ${[4, 1]} is equal to: ${network.activate([4, 1])}`);

console.log(`input ${[3, 1]} is equal to: ${network.activate([3, 1])}`);
// console.log(`input ${[1, 6]} is equal to: ${network.activate([1, 6])}`);

console.log(network);
