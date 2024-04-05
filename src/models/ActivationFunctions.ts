export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivative(x: number) {
  const sig = sigmoid(x);
  return sig * (1 - sig);
}

export function tanh(x: number): number {
  return Math.tanh(x);
}

export function tanhDerivative(x: number): number {
  return 1 - Math.pow(tanh(x), 2);
}

export function linear(x: number): number {
  return x;
}

export function linearDerivative(_: number) {
  return 1;
}

export function softmax(inputs: number[]): number[] {
  const maxInput = Math.max(...inputs);
  const exps = inputs.map((value) => Math.exp(value - maxInput));
  const sumExps = exps.reduce((sum, value) => sum + value, 0);
  return exps.map((value) => value / sumExps);
}

export function softmaxDerivative(value: number, values: number[]): number {
  const softmaxValues = softmax(values);
  const i = values.findIndex((num) => num === value);
  const derivative = softmaxValues[i] * (1 - softmaxValues[i]);

  return derivative;
}
