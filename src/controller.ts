import "./style.css";
import { ChartView } from "./views/ChartView";
import state from "./models/State";
import { Group, Point } from "./models/Point";
import { Network } from "./models/Network";
import { gradientDescent } from "./models/trainingAlgorithms";
import {
  softmax,
  softmaxDerivative,
  tanh,
  tanhDerivative,
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
    .addHiddenLayer(tanh, tanhDerivative, 4)
    .addHiddenLayer(tanh, tanhDerivative, 4)
    .addHiddenLayer(tanh, tanhDerivative, 4)
    .setOutputLayer(
      softmax,
      softmaxDerivative,
      state.dataModel.getGroups().length
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
  const network = buildNetwork();
  network.initialize();
  const ps = getLearningAlgorithmParamters();
  state.dataModel.alpha = ps.learningRate;

  for (let i = 0; i < ps.epochs; i++)
    network.train(formatDataset(), gradientDescent);

  const shadowDatasets = chart.getShadowDataset();

  for (let i = 0; i <= 100; i = i + 1.5) {
    for (let j = 0; j <= 100; j = j + 1.2) {
      const ans = network.activate([j, i]);
      const groupNum = ans.indexOf(Math.max(...ans)) + 1;
      shadowDatasets[`Group ${groupNum} Shadow`].data.push([j, i]);
    }
  }

  chart.updateChart();
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

const chart: ChartView = new ChartView();

init();
