import { _elementsEqual } from "chart.js/helpers";
import { Network } from "./Network";
import state from "./State";
import { Layer } from "./Layer";
import Matrix from "ml-matrix";
import { softmax, softmaxDerivative } from "./ActivationFunctions";

export function gradientDescent(dataset: number[][], network: Network): void {
  // 1. iterate through the dataset line by line
  if (network.outputLayer === null) {
    throw new Error("Output layer not set");
  }

  console.log("Before learning");

  console.log("Weights for each layer:");
  console.log("Output: ");
  console.log(network.outputLayer?.weightMatrix);

  network.hiddenLayers.forEach((layer, i) => {
    console.log(`Hidden layer ${i}`);
    console.log(layer.weightMatrix);
  });

  for (let labeledInput of dataset) {
    network.hiddenLayers.forEach((layer) => (layer.gradients = []));
    network.outputLayer.gradients = [];

    if (debug(network.outputLayer!.weightMatrix)) {
      debugger;
    }
    // 2. activate layers, layer by layer starting from input to output
    /**
     * Input neuron activations are just the input themselves
     * Hidden neurons activations are the weighted sum plugged into an activation function
     * Output neurons same as hidden ones
     */
    const actualOutput = network.activate(
      labeledInput.slice(0, network.numberOfFeatures)
    );

    // 3.calculate the error and start back propagating
    const allLayers = [
      network.outputLayer,
      ...[...network.hiddenLayers].reverse(),
    ];

    type NeuronAdjustment = {
      weightAdjustments: number[];
      thresholdAdjustment: number;
    };

    const allAdjustments: NeuronAdjustment[][] = [];

    const desiredOutput = labeledInput.slice(network.numberOfFeatures);

    const outputLayerAdjustments = actualOutput.map((_, i) => {
      if (debug(network.outputLayer!.weightMatrix)) {
        debugger;
      }
      /**
       * Output neurons error calculation is the difference between actual and desired outputs
       */
      const error = desiredOutput[i] - actualOutput[i];

      // const gradient = network.outputLayer!.derivativeOfActivation(
      //   actualOutput[i]
      // );

      const gradient = softmaxDerivative(i, actualOutput);

      network.outputLayer!.gradients.push(gradient);

      if (!gradient) {
        throw new Error("No output layer set");
      }

      const gradientError = error * gradient;

      const weightAdjustments = network.outputLayer!.inputs.map(
        (input) => gradientError * state.dataModel.alpha * input
      );

      const thresholdAdjustment =
        gradientError *
        state.dataModel.alpha *
        network.outputLayer!.thresholds[i];

      if (debug([weightAdjustments])) {
        debugger;
      }
      return {
        weightAdjustments: weightAdjustments,
        thresholdAdjustment: thresholdAdjustment,
      } as NeuronAdjustment;
    });

    allAdjustments.push(outputLayerAdjustments);

    const reversedHiddenLayers: Layer[] = [
      ...network.hiddenLayers,
      network.outputLayer!,
    ].reverse();

    console.log("hello");
    console.log(reversedHiddenLayers.length - 1);
    for (let i = 1; i < reversedHiddenLayers.length; i++) {
      const currentLayerOutput = reversedHiddenLayers[i - 1]!.inputs;
      const nextWeightMatrix = reversedHiddenLayers[i - 1]!.weightMatrix;
      const nextGradients = reversedHiddenLayers[i - 1]!.gradients;

      const hiddenlayerAdjustments = reversedHiddenLayers[i]!.neurons.map(
        (neuron, j) => {
          const gradient = reversedHiddenLayers[i]!.derivativeOfActivation(
            currentLayerOutput[j]
          );

          reversedHiddenLayers[i]!.gradients.push(gradient);
          /*
           * Hidden neurons error calculation is the effect on further layers
           */
          const error = nextWeightMatrix.reduce(
            (sum: number, weightVector: number[], k: number) =>
              nextGradients[k] * weightVector[j] + sum,
            0
          );
          console.log(`Error is for neuron ${j} is ${error}`);

          const gradientError = error * gradient;

          // console.log(`inputs of hidden layer are:`);
          // console.log(reversedHiddenLayers[i]!.inputs);
          const weightAdjustments = reversedHiddenLayers[i]!.inputs.map(
            (input) => {
              return state.dataModel.alpha * gradientError * input;
            }
          );

          const thresholdAdjustment =
            reversedHiddenLayers[i].thresholds[j] *
            state.dataModel.alpha *
            gradientError;

          if (debug([weightAdjustments])) {
            debugger;
          }

          return { weightAdjustments, thresholdAdjustment } as NeuronAdjustment;
        }
      );

      allAdjustments.push(hiddenlayerAdjustments);
    }
    // 4. update old weights and thresholds to the new calculated values
    allAdjustments.forEach((layerAdjustment, i: number) => {
      // console.log(`Adjustment matrix ${i}`);
      // console.log(adjustmentMatrix);
      const A = new Matrix(
        layerAdjustment.map((adjustment) => adjustment.weightAdjustments)
      );
      const B = new Matrix(reversedHiddenLayers[i].weightMatrix);

      reversedHiddenLayers[i].weightMatrix = Matrix.add(A, B).to2DArray();

      const C = new Matrix([
        layerAdjustment.map((adjustment) => adjustment.thresholdAdjustment),
      ]);

      const D = new Matrix([reversedHiddenLayers[i].thresholds]);

      console.log(`threshold before adjustment layer ${i}`);
      console.log(reversedHiddenLayers[i].thresholds);

      reversedHiddenLayers[i].thresholds = Matrix.add(C, D).to1DArray();

      console.log(`threshold after adjustment layer ${i}`);
      console.log(reversedHiddenLayers[i].thresholds);

      if (debug(network.outputLayer!.weightMatrix)) {
        debugger;
      }
    });
    if (debug(network.outputLayer!.weightMatrix)) {
      debugger;
    }
  }
  console.log("After learning");
  console.log("Weights for each layer:");
  console.log("Output: ");
  console.log(network.outputLayer?.weightMatrix);

  network.hiddenLayers.forEach((layer, i) => {
    console.log(`Hidden layer ${i}`);
    console.log(layer.weightMatrix);
  });
  // TODO: finish gradient descent algorithm
}

function debug(weights: number[][]): boolean {
  return weights.some((w) => w.some((x) => x > 2.4 || x < -2.4));
}
