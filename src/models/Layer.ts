import { MathematicalFunction } from "../utilities";
import { HiddenNeuron, Neuron, OutputNeuron } from "./Neuron";

export abstract class Layer {
  neurons: Neuron[] = [];
  activationFunction: MathematicalFunction;
  derivativeOfActivation: MathematicalFunction;
  gradients: number[] = [];
  weightMatrix: number[][] = [];
  thresholds: number[] = [];
  inputs: number[] = [];

  constructor(
    activationFunction: MathematicalFunction,
    derivativeOfActivation: MathematicalFunction
  ) {
    this.activationFunction = activationFunction;
    this.derivativeOfActivation = derivativeOfActivation;
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
  constructor(
    activationFunction: MathematicalFunction,
    derivativeOfActivation: MathematicalFunction
  ) {
    super(activationFunction, derivativeOfActivation);
  }

  public addNeuron(countOfPreviousLayerNeurons: number): Layer {
    {
      this.weightMatrix.push(new Array<number>(countOfPreviousLayerNeurons));
      this.thresholds.push(0);

      this.neurons.push(new HiddenNeuron());

      return this;
    }
  }
}

export class OutputLayer extends Layer {
  constructor(
    activationFunction: MathematicalFunction,
    derivativeOfActivation: MathematicalFunction
  ) {
    super(activationFunction, derivativeOfActivation);
  }

  public addNeuron(countOfPreviousLayerNeurons: number): Layer {
    {
      this.weightMatrix.push(new Array<number>(countOfPreviousLayerNeurons));
      this.thresholds.push(0);

      this.neurons.push(new OutputNeuron());

      return this;
    }
  }
}
