import { HiddenLayer, OutputLayer } from "./Layer";
import { Network } from "./Network";

export class NetworkBuilder {
  private _network = new Network();

  public setNumberOfFeatures(inputs: number): NetworkBuilder {
    this._network.numberOfFeatures = inputs;
    return this;
  }

  public addHiddenLayer(
    activationFunction: (x: number) => number,
    numOfNeurons: number
  ): NetworkBuilder {
    for (let i = 0; i < numOfNeurons; i++) {
      this._network.hiddenLayers.push(new HiddenLayer(activationFunction));
    }

    return this;
  }

  public setOutputLayer(
    activationFunction: (x: number) => number,
    numOfNeurons: number
  ): NetworkBuilder {
    let layer = new OutputLayer(activationFunction);

    for (let i = 0; i < numOfNeurons; i++) {
      layer.addNeuron();
    }

    this._network.outputLayer = layer;
    return this;
  }

  public build(): Network {
    return this._network;
  }
}
