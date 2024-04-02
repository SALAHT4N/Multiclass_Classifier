import { HiddenNeuron, InputNeuron, Neuron, OutputNeuron } from "./Neuron";

type NeuronType = "input" | "hidden" | "output";

export class Layer {
  activationFunction: (input: number) => number;
  weightMatrix: number[][] = [[]];
  thresholds: number[] = [];
  inputs: number[] = [];
  neurons: Neuron[] = [];
  type: NeuronType;

  constructor(activationFunction: (input: number) => number, type: NeuronType) {
    this.activationFunction = activationFunction;
    this.type = type;
  }

  addNeuron(): Layer {
    let neuron: Neuron;

    if (this.type === "input") {
      neuron = new InputNeuron(this.inputs[this.neurons.length]);
    } else if (this.type === "hidden") {
      neuron = new HiddenNeuron(
        this.weightMatrix[this.neurons.length],
        this.inputs
      );
    } else {
      neuron = new OutputNeuron(
        this.weightMatrix[this.neurons.length],
        this.inputs
      );
    }

    this.neurons.push(neuron);
    return this;
  }
}
