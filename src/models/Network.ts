import { Layer } from "./Layer";
import { NetworkBuilder } from "./NetworkBuilder";

export type TrainingAlgorithm = (
  dataset: number[][],
  outputLayer: Layer,
  hiddenLayers: Layer[]
) => void;

export class Network {
  hiddenLayers: Layer[] = [];
  inputLayer: Layer | null = null;
  outputLayer: Layer | null = null;

  public initialize(): void {
    // initialize weights and thresholds
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
