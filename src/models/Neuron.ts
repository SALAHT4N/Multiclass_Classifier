export interface Neuron {
  /**
   * This method activates the neuron and returns the net value (prior to activation function)
   * @returns weighted sum
   */
  activate(): number;
}

export class InputNeuron implements Neuron {
  input: number;

  constructor(input: number) {
    this.input = input;
  }
  activate(): number {
    return this.input;
  }
}

abstract class ComputationalNeuron implements Neuron {
  inputs: number[];
  weights: number[];

  constructor(weights: number[], inputs: number[]) {
    this.weights = weights;
    this.inputs = inputs;
  }

  activate(): number {
    return this.weights.reduce(
      (sum, weight, i) => (sum += weight * this.inputs[i]),
      0
    );
  }

  /**
   * This method calculates the weight adjustments for attached lines
   * @returns weights adjustments
   */
  abstract learn(): number[]; // TODO: Implement learn mehtod
}

export class HiddenNeuron extends ComputationalNeuron {
  constructor(weights: number[], inputs: number[]) {
    super(weights, inputs);
  }

  learn(): number[] {
    throw new Error("Method not implemented.");
  }
}

export class OutputNeuron extends ComputationalNeuron {
  constructor(weights: number[], inputs: number[]) {
    super(weights, inputs);
  }

  learn(): number[] {
    throw new Error("Method not implemented.");
  }
}
