import Matrix from "ml-matrix";
import { MathematicalFunction } from "../utilities";
import { NeuronAdjustment } from "./Network";
import { HiddenNeuron, Neuron, OutputNeuron } from "./Neuron";

export abstract class Layer {
  neurons: Neuron[] = [];
  activationFunction: any;
  derivativeOfActivation: any;
  gradients: number[] = [];
  weightMatrix: number[][] = [];
  thresholds: number[] = [];
  inputs: number[] = [];
  preActivations: number[] = [];

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

    this.preActivations = this.neurons.map((neuron, i) =>
      neuron.activate(layerInput, this.weightMatrix[i], this.thresholds[i])
    );

    return this.preActivations.map((preAct) => this.activationFunction(preAct));
  }

  /**
   * This method updates the weights and thresholds for this layer
   * @param adjustments array of NeuronAdjustment for each neuron in this layer
   */
  public update(adjustments: NeuronAdjustment[]): void {
    const A = new Matrix(
      adjustments.map((adjustment) => adjustment.weightAdjustments)
    );
    const B = new Matrix(this.weightMatrix);

    this.weightMatrix = Matrix.add(A, B).to2DArray();

    const C = new Matrix([
      adjustments.map((adjustment) => adjustment.thresholdAdjustment),
    ]);

    const D = new Matrix([this.thresholds]);

    this.thresholds = Matrix.subtract(C, D).to1DArray();
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

  /**
   * This method triggers the learning process for this layer
   * @param outputs the calculated activations of this layer
   * @param nextWeightMatrix weight matrix of next layer in network
   * @param nextGradients gradients of next layer in network
   * @param alpha learning rate
   * @returns Adjustments to be applied to each neuron in this layer
   */
  public learn(
    outputs: number[],
    nextWeightMatrix: number[][],
    nextGradients: number[],
    alpha: number
  ): NeuronAdjustment[] {
    return this.neurons.map((_neuron, j) => {
      const gradient = this.derivativeOfActivation(outputs[j]);

      this.gradients.push(gradient);

      const error = nextWeightMatrix.reduce(
        (sum: number, weightVector: number[], k: number) =>
          nextGradients[k] * weightVector[j] + sum,
        0
      );

      const gradientError = error * gradient;
      const weightAdjustments = this.inputs.map((input) => {
        return alpha * gradientError * input;
      });

      const thresholdAdjustment = -1 * alpha * gradientError;

      return { weightAdjustments, thresholdAdjustment } as NeuronAdjustment;
    });
  }
}

export class OutputLayer extends Layer {
  outputs: number[] = [];

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

  public activate(layerInput: number[]): number[] {
    this.inputs = layerInput;

    const preActivations = this.neurons.map((neuron, i) =>
      neuron.activate(layerInput, this.weightMatrix[i], this.thresholds[i])
    );
    this.preActivations = preActivations;
    return this.activationFunction(preActivations);
  }

  /**
   * This method triggers the learning process for this layer
   * @param desiredOutput output portion of one data sample
   * @param alpha learning rate
   * @returns Adjustments to be applied to each neuron in this layer
   */
  public learn(desiredOutput: number[], alpha: number): NeuronAdjustment[] {
    return this.outputs.map((_, i) => {
      /**
       * Output neurons error calculation is the difference between actual and desired outputs
       */
      const error = desiredOutput[i] - this.outputs[i];

      const gradient = this.derivativeOfActivation(
        this.outputs[i],
        this.outputs
      );

      this.gradients.push(gradient);
      const gradientError = error * gradient;

      return {
        weightAdjustments: this.inputs.map(
          (input) => gradientError * alpha * input
        ),
        thresholdAdjustment: gradientError * alpha * -1,
      } as NeuronAdjustment;
    });
  }
}
