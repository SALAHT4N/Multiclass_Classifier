import "./style.css";
import { ChartView } from "./views/ChartView";
import state from "./models/State";
import { Point } from "./models/Point";

const chart: ChartView = new ChartView();

function onClickChartHandler(point: Point) {
  point.group = state.currentSelectedGroup;
  state.chartState.addPoint(point);
}

type NeuronType = "Input" | "Hidden" | "Output";

type Neuron = {
  type: NeuronType;
  activate(): number;
};

type Layer = {
  addNeuron(): Layer;
  neurons: Neuron[];
  weightMatrix: number[][];
  inputs: number[];
  activationFunction(net: number): number;
};

type Network = {
  withLayer(layer: Layer): Network;
  train(): void;
  init(): void;
  layers: Layer[];
};

function createNetwork(): Network {
  return {
    layers: [],
    withLayer(layer: Layer) {
      this.layers.push(layer);
      return this;
    },
    init(): void {
      this.layers.forEach((layer) => layer); // initialize weight matrices and inputs
    },
    train() {
      train();
    },
  };
}

function createLayer(type: NeuronType): Layer {
  return {
    neurons: [],
    addNeuron(): Layer {
      this.neurons.push(createNeuron(type));
      return this;
    },
    weightMatrix: [[]],
    inputs: [],
    activationFunction(net: number): number {
      return net; // linear function
    },
  };
}

function createNeuron(type: NeuronType): Neuron {
  return {
    type: type,
    activate(): number {
      return 0;
    },
  };
}

function buildNetwork(): Network {
  const inputLayer = createLayer("Input").addNeuron().addNeuron();
  const hiddenLayer = createLayer("Hidden").addNeuron().addNeuron().addNeuron();
  const outputLayer = createLayer("Output")
    .addNeuron()
    .addNeuron()
    .addNeuron()
    .addNeuron();

  return createNetwork()
    .withLayer(inputLayer)
    .withLayer(hiddenLayer)
    .withLayer(outputLayer);
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
network.init();
captureDataset();
network.train = train;
network.train();
classify();
