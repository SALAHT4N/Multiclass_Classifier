import { HiddenLayer, OutputLayer } from "./Layer";

export function gradientDescent(
  dataset: number[][],
  outputLayer: OutputLayer,
  hiddenLayers: HiddenLayer[]
): void {
  for (let input of dataset) {
    hiddenLayers.forEach((layer) => {});
  }
  // TODO: finish gradient descent algorithm
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
