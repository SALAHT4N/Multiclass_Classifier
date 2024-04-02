import { HiddenNeuron, Neuron, OutputNeuron } from "./Neuron";

abstract class Layer {
  neurons: Neuron[] = [];
  activationFunction: (input: number) => number;
  weightMatrix: number[][] = [[]];
  thresholds: number[] = [];
  inputs: number[] = [];

  constructor(activationFunction: (input: number) => number) {
    this.activationFunction = activationFunction;
  }

  public abstract addNeuron(): Layer;
}

export class HiddenLayer extends Layer {
  constructor(activationFunction: (input: number) => number) {
    super(activationFunction);
  }

  public addNeuron(): Layer {
    {
      let neuron: Neuron;

      neuron = new HiddenNeuron(
        this.weightMatrix[this.neurons.length],
        this.inputs
      );

      this.neurons.push(neuron);
      return this;
    }
  }
}

export class OutputLayer extends Layer {
  constructor(activationFunction: (input: number) => number) {
    super(activationFunction);
  }

  public addNeuron(): Layer {
    {
      let neuron: Neuron;

      neuron = new OutputNeuron(
        this.weightMatrix[this.neurons.length],
        this.inputs
      );

      this.neurons.push(neuron);
      return this;
    }
  }
}
