import { _elementsEqual } from "chart.js/helpers";
import { Network, NeuronAdjustment } from "./Network";
import state from "./State";
import { HiddenLayer } from "./Layer";

export function gradientDescent(dataset: number[][], network: Network): void {
  const clearOldGradients = () => {
    network.hiddenLayers.forEach((layer) => (layer.gradients = []));
    network.outputLayer!.gradients = [];
  };

  // 1. iterate through the dataset line by line
  if (network.outputLayer === null) {
    throw new Error("Output layer not set");
  }
  logWeightsToConsole(network, "Before");

  for (let labeledInput of dataset) {
    clearOldGradients();

    // 2. activate layers, layer by layer starting from input to output
    network.activate(labeledInput.slice(0, network.numberOfFeatures));

    // 3.calculate the error and start back propagating
    const triggerHiddenLayersLearn = (hiddenLayers: HiddenLayer[]) => {
      const adjustments: NeuronAdjustment[][] = [];

      for (let i = 0; i < hiddenLayers.length; i++) {
        let currentLayerOutput: number[];
        let nextWeightMatrix: number[][];
        let nextGradients: number[];

        if (i > 0) {
          currentLayerOutput = hiddenLayers[i - 1]!.inputs;
          nextWeightMatrix = hiddenLayers[i - 1]!.weightMatrix;
          nextGradients = hiddenLayers[i - 1]!.gradients;
        } else {
          currentLayerOutput = network.outputLayer!.inputs;
          nextWeightMatrix = network.outputLayer!.weightMatrix;
          nextGradients = network.outputLayer!.gradients;
        }

        const hiddenlayerAdjustments = hiddenLayers[i].learn(
          currentLayerOutput,
          nextWeightMatrix,
          nextGradients,
          state.dataModel.alpha
        );

        adjustments.push(hiddenlayerAdjustments);
      }

      return adjustments;
    };

    const desiredOutput = labeledInput.slice(network.numberOfFeatures);
    const outputLayerAdjustments = network.outputLayer.learn(
      desiredOutput,
      state.dataModel.alpha
    );

    const reversedHiddenLayers: HiddenLayer[] = [
      ...network.hiddenLayers,
    ].reverse();

    const hiddenAdjustments = triggerHiddenLayersLearn(reversedHiddenLayers);

    const allAdjustments: NeuronAdjustment[][] = [
      outputLayerAdjustments,
      ...hiddenAdjustments,
    ];

    // 4. update old weights and thresholds to the new calculated values
    network.update(allAdjustments);
  }

  logWeightsToConsole(network, "After");
}

function logWeightsToConsole(network: Network, phase: "Before" | "After") {
  console.log(`${phase} learning`);
  console.log("Weights for each layer:");
  console.log("Output: ");
  console.log(JSON.parse(JSON.stringify(network.outputLayer?.weightMatrix)));

  network.hiddenLayers.forEach((layer, i) => {
    console.log(`Hidden layer ${i}`);
    console.log(JSON.parse(JSON.stringify(layer.weightMatrix)));
  });
}
function debug(weights: number[][]): boolean {
  return weights.some((w) => w.some((x) => x > 2.4 || x < -2.4));
}
