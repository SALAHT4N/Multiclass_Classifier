import { generateRandomValue } from "../utilities";
import { HiddenLayer, OutputLayer } from "./Layer";
import { NetworkBuilder } from "./NetworkBuilder";

export type TrainingAlgorithm = (
  dataset: number[][],
  outputLayer: OutputLayer,
  hiddenLayers: HiddenLayer[]
) => void;

export class Network {
  hiddenLayers: HiddenLayer[] = [];
  outputLayer: OutputLayer | null = null;
  numberOfFeatures = 2;

  public initialize(): void {
    const lowerBound = 0;
    const upperBound = 0;

    // TODO: finished initializeing
    this.hiddenLayers.forEach((layer) => {
      layer.weightMatrix.forEach((weightVector) => {
        weightVector.fill(generateRandomValue(lowerBound, upperBound));
      });
    });
  }

  public train(
    dataset: number[][],
    trainingAlgorithm: TrainingAlgorithm
  ): void {
    if (this.outputLayer === null) {
      throw new Error("output layer not specified");
    }

    trainingAlgorithm(dataset, this.outputLayer, this.hiddenLayers);
  }

  /**
   * This method activates the nueral network and returns the output of the activation
   * @param dataset labeled input sample
   */
  public activate(dataset: number[]): number[] {
    throw new Error("Not implemented yet");
  }

  public static getBuilder(): NetworkBuilder {
    return new NetworkBuilder();
  }
}
