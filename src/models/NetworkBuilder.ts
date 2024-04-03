import { _angleBetween } from "chart.js/helpers";
import { HiddenLayer, OutputLayer } from "./Layer";
import { Network } from "./Network";
import { MathematicalFunction } from "../utilities";

export class NetworkBuilder {
  private _network = new Network();

  public setNumberOfFeatures(inputs: number): NetworkBuilder {
    this._network.numberOfFeatures = inputs;
    return this;
  }

  public addHiddenLayer(
    activationFunction: MathematicalFunction,
    derivativeOfActivation: MathematicalFunction,
    numOfNeurons: number
  ): NetworkBuilder {
    let layer = new HiddenLayer(activationFunction, derivativeOfActivation);

    this._network.insertHiddenLayer(layer, numOfNeurons);

    return this;
  }

  public setOutputLayer(
    activationFunction: MathematicalFunction,
    derivativeOfActivation: MathematicalFunction,
    numOfNeurons: number
  ): Network {
    let layer = new OutputLayer(activationFunction, derivativeOfActivation);

    this._network.insertOutputLayer(layer, numOfNeurons);

    return this._network;
  }
}
