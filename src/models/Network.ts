import { generateRandomValue } from "../utilities";
import { HiddenLayer, Layer, OutputLayer } from "./Layer";
import { NetworkBuilder } from "./NetworkBuilder";

export type TrainingAlgorithm = (dataset: number[][], network: Network) => void;

export class Network {
  hiddenLayers: HiddenLayer[] = [];
  outputLayer: OutputLayer | null = null;
  numberOfFeatures = 2;

  /**
   * This method initialize the weights and thresholds of the neural network
   */
  public initialize(): void {
    [...this.hiddenLayers, this.outputLayer!].forEach((layer) => {
      const lowerBound = -2.4 / layer.weightMatrix[0].length;
      const upperBound = 2.4 / layer.weightMatrix[0].length;

      layer.weightMatrix.forEach((weightVector) => {
        weightVector.fill(
          generateRandomValue(lowerBound, upperBound),
          0,
          weightVector.length
        );
      });

      layer.thresholds.fill(
        generateRandomValue(lowerBound, upperBound),
        0,
        layer.thresholds.length
      );
    });
  }

  /**
   * This method appends a hidden layer to the network hidden layers
   * @param layer layer to insert
   * @param numOfNeurons number of neurons in layer to be inserted
   */
  public insertHiddenLayer(layer: HiddenLayer, numOfNeurons: number): void {
    const NUMBER_OF_INPUT_NEURONS = 2;
    let countOfNeuronsInPreviousLayer = NUMBER_OF_INPUT_NEURONS;

    const notFirstLayer = (): boolean => {
      return this.hiddenLayers.length !== 0;
    };

    if (notFirstLayer()) {
      const lastLayer = this.hiddenLayers[this.hiddenLayers.length - 1];

      countOfNeuronsInPreviousLayer = lastLayer.neurons.length;
    }

    for (let i = 0; i < numOfNeurons; i++) {
      layer.addNeuron(countOfNeuronsInPreviousLayer);
    }

    this.hiddenLayers.push(layer);
  }

  /**
   * This method inserts the output layer at the end of the neural network
   * @param layer output layer to be set
   * @param numOfNeurons number of neurons in output layer
   */
  public insertOutputLayer(layer: OutputLayer, numOfNeurons: number): void {
    const NUMBER_OF_INPUT_NEURONS = 2;

    let countOfNeuronsInPreviousLayer = NUMBER_OF_INPUT_NEURONS;

    if (this.hiddenLayers.length !== 0) {
      const lastLayer = this.hiddenLayers[this.hiddenLayers.length - 1];

      countOfNeuronsInPreviousLayer = lastLayer.neurons.length;
    }

    for (let i = 0; i < numOfNeurons; i++) {
      layer.addNeuron(countOfNeuronsInPreviousLayer);
    }

    this.outputLayer = layer;
  }

  /**
   * This method starts the training process of the neural network
   * @param dataset Labeled dataset
   * @param trainingAlgorithm Training algorithm to be used
   */
  public train(
    dataset: number[][],
    trainingAlgorithm: TrainingAlgorithm
  ): void {
    if (this.outputLayer === null) {
      throw new Error("output layer not specified");
    }

    trainingAlgorithm(dataset, this);
  }

  /**
   * This method activates the nueral network and calculates the output of the activation
   * @param input input portion of a single data point
   */
  public activate(input: number[]): number[] {
    if (this.outputLayer === null) {
      throw new Error("Output layer not set");
    }

    const allLayers: Layer[] = [...this.hiddenLayers, this.outputLayer];
    let outputs = input;

    for (let i = 0; i < allLayers.length; i++) {
      outputs = allLayers[i].activate(outputs);
    }
    return outputs;
  }

  /**
   * This method returns a builder to build a neural network
   * @returns Network Builder
   */
  public static getBuilder(): NetworkBuilder {
    return new NetworkBuilder();
  }
}
