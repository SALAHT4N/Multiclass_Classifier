import { _angleBetween } from "chart.js/helpers";
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
    let layer = new HiddenLayer(activationFunction);

    this._network.insertHiddenLayer(layer, numOfNeurons);

    return this;
  }

  public setOutputLayer(
    activationFunction: (x: number) => number,
    numOfNeurons: number
  ): Network {
    let layer = new OutputLayer(activationFunction);

    this._network.insertOutputLayer(layer, numOfNeurons);

    return this._network;
  }
}
