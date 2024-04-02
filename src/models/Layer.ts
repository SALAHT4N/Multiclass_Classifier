import { HiddenNeuron, Neuron, OutputNeuron } from "./Neuron";

export abstract class Layer {
  neurons: Neuron[] = [];
  activationFunction: (input: number) => number;
  weightMatrix: number[][] = [];
  thresholds: number[] = [];
  inputs: number[] = [];

  constructor(activationFunction: (input: number) => number) {
    this.activationFunction = activationFunction;
  }

  /**
   * This method calculates each neuron activation in this layer and returns them
   * @param layerInput Inputs to this layer
   * @returns Array of neurons' activations
   */
  public activate(layerInput: number[]): number[] {
    this.inputs = layerInput;

    return this.neurons.map((neuron, i) =>
      this.activationFunction(
        neuron.activate(layerInput, this.weightMatrix[i], this.thresholds[i])
      )
    );
  }

  /**
   * This method adds a neuron to a layer
   * @param countOfPreviousLayerNeurons equals the number of outputs of previous layer
   */
  public abstract addNeuron(countOfPreviousLayerNeurons: number): Layer;
}

export class HiddenLayer extends Layer {
  constructor(activationFunction: (input: number) => number) {
    super(activationFunction);
  }

  public addNeuron(countOfPreviousLayerNeurons: number): Layer {
    {
      this.weightMatrix.push(new Array<number>(countOfPreviousLayerNeurons));

      this.neurons.push(new HiddenNeuron());

      return this;
    }
  }
}

export class OutputLayer extends Layer {
  constructor(activationFunction: (input: number) => number) {
    super(activationFunction);
  }

  public addNeuron(countOfPreviousLayerNeurons: number): Layer {
    {
      this.weightMatrix.push(new Array<number>(countOfPreviousLayerNeurons));

      this.neurons.push(new OutputNeuron());

      return this;
    }
  }
}
