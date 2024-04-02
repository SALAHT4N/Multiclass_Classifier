import { Layer } from "./Layer";
import { Network } from "./Network";

export class NetworkBuilder {
  private _network = new Network();

  public addHiddenLayer(
    activationFunction: (x: number) => number,
    numOfNeurons: number
  ): NetworkBuilder {
    for (let i = 0; i < numOfNeurons; i++) {
      this._network.hiddenLayers.push(new Layer(activationFunction, "hidden"));
    }

    return this;
  }

  public setOutputLayer(
    activationFunction: (x: number) => number,
    numOfNeurons: number
  ): NetworkBuilder {
    let layer = new Layer(activationFunction, "output");

    for (let i = 0; i < numOfNeurons; i++) {
      layer.addNeuron();
    }

    this._network.outputLayer = layer;
    return this;
  }

  public setInputLayer(numOfNeurons: number): NetworkBuilder {
    let layer = new Layer((x) => x, "input");

    for (let i = 0; i < numOfNeurons; i++) {
      layer.addNeuron();
    }

    this._network.inputLayer = layer;
    return this;
  }

  public build(): Network {
    return this._network;
  }
}
