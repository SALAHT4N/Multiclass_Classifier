import { Layer } from "./Layer";

export class Network {
  hiddenLayers: Layer[] = [];
  inputLayer: Layer | null = null;
  outputLayer: Layer | null = null;
}
