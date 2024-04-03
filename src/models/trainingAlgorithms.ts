import { _elementsEqual } from "chart.js/helpers";
import { Network } from "./Network";
import state from "./State";
import { Layer } from "./Layer";
import Matrix from "ml-matrix";

export function gradientDescent(dataset: number[][], network: Network): void {
  // 1. iterate through the dataset line by line
  for (let labeledInput of dataset) {
    // 2. activate layers, layer by layer starting from input to output
    /**
     * Input neuron activations are just the input themselves
     * Hidden neurons activations are the weighted sum plugged into an activation function
     * Output neurons same as hidden ones
     */
    const actualOutput = network.activate(labeledInput);

    // 3.calculate the error and start back propagating
    const allLayers = [
      network.outputLayer,
      ...[...network.hiddenLayers].reverse(),
    ];

    const allAdjustments: number[][][] = [];

    const desiredOutput = labeledInput.slice(network.numberOfFeatures);

    const weightAdjustmentsMatrix = actualOutput.map((_, i) => {
      /**
       * Output neurons error calculation is the difference between actual and desired outputs
       */
      const error = desiredOutput[i] - actualOutput[i];

      const gradient = network.outputLayer!.derivativeOfActivation(
        actualOutput[i]
      );

      network.outputLayer!.gradients.push(gradient);

      if (!gradient) {
        throw new Error("No output layer set");
      }

      const gradientError = error * gradient;

      const weightAdjustments = network.outputLayer!.inputs.map(
        (input) => gradientError * state.dataModel.alpha * input
      );

      return weightAdjustments;
    });

    allAdjustments.push(weightAdjustmentsMatrix);

    const reversedHiddenLayers: Layer[] = [
      ...network.hiddenLayers,
      network.outputLayer!,
    ].reverse();

    for (let i = 1; i < reversedHiddenLayers.length; i++) {
      const currentLayerOutput = reversedHiddenLayers[i - 1]!.inputs;
      const nextWeightMatrix = reversedHiddenLayers[i - 1]!.weightMatrix;
      const nextGradients = reversedHiddenLayers[i - 1]!.gradients;

      const weightAdjustmentsMatrix = reversedHiddenLayers[i]!.neurons.map(
        (neuron, j) => {
          const gradient = reversedHiddenLayers[i]!.derivativeOfActivation(
            currentLayerOutput[j]
          );

          reversedHiddenLayers[i]!.gradients.push(gradient);
          /*
           * Hidden neurons error calculation is the effect on further layers
           */
          const error = nextWeightMatrix.reduce((sum, weightVector, i) => {
            return nextGradients[i] * weightVector[j] + sum;
          }, 0);

          const gradientError = error * gradient;

          const weightAdjustments = reversedHiddenLayers[i]!.inputs.map(
            (input) => {
              return state.dataModel.alpha * gradientError * input;
            }
          );

          return weightAdjustments;
        }
      );

      allAdjustments.push(weightAdjustmentsMatrix);
    }
    // 4. update old weights and thresholds to the new calculated values
    allAdjustments.forEach((adjustmentMatrix: number[][], i: number) => {
      const A = new Matrix(adjustmentMatrix);
      const B = new Matrix(reversedHiddenLayers[i].weightMatrix);

      reversedHiddenLayers[i].weightMatrix = Matrix.add(A, B).to2DArray();
    });
  }
  // TODO: finish gradient descent algorithm
}
