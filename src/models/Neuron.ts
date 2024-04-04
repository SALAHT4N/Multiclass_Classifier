export abstract class Neuron {
  /**
   * This method activates the neuron and returns the net value (prior to activation function)
   * @param inputs inputs to this neuron
   * @param weights weights attached to this neuron
   * @param threshold threshold value of this neuron
   * @returns weighted sum
   */
  public activate(
    inputs: number[],
    weights: number[],
    threshold: number
  ): number {
    const netValue =
      weights.reduce((sum, weight, i) => sum + weight * inputs[i], 0) +
      threshold;
    return netValue;
  }

  /**
   * This method calculates the weight adjustments for attached lines
   * @returns weights adjustments
   */
  public abstract learn(): number[];
}

export class HiddenNeuron extends Neuron {
  learn(): number[] {
    throw new Error("Method not implemented.");
  }
}

export class OutputNeuron extends Neuron {
  learn(): number[] {
    throw new Error("Method not implemented.");
  }
}
