import "./style.css";
import { ChartView } from "./views/ChartView";

let chart = new ChartView();

type NeuronType = "Input" | "Hidden" | "Output";

type Neuron = {
  type: NeuronType;
};

type Layer = {
  addNeuron(neuron: Neuron): Layer;
  neurons: Neuron[];
};

type Network = {
  addLayer(layer: Layer): Network;
  layers: Layer[];
};

function createNetwork(): Network {
  return {
    layers: [],
    addLayer(layer: Layer) {
      this.layers.push(layer);
      return this;
    },
  };
}

function createLayer(): Layer {
  return {
    neurons: [],
    addNeuron(neuron): Layer {
      this.neurons.push(neuron);
      return this;
    },
  };
}

function createNeuron(type: NeuronType): Neuron {
  return {
    type: type,
  };
}

function buildNetwork(): void {
  let layer = createLayer()
    .addNeuron(createNeuron("Hidden"))
    .addNeuron(createNeuron("Hidden"))
    .addNeuron(createNeuron("Hidden"))
    .addNeuron(createNeuron("Input"))
    .addNeuron(createNeuron("Input"))
    .addNeuron(createNeuron("Output"))
    .addNeuron(createNeuron("Output"))
    .addNeuron(createNeuron("Output"))
    .addNeuron(createNeuron("Output"));

  let network = createNetwork();
  network.addLayer(layer);
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
  chart = chart;
}

init();
buildNetwork();
captureDataset();
train();
classify();
