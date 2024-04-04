export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivative(x: number) {
  const sig = sigmoid(x);
  return sig * (1 - sig);
}

export function softmax(x: number, y: number[]): number {
  const allValues = [x, ...y];
  const maxInput = Math.max(...allValues);
  const expValues = allValues.map((value) => Math.exp(value - maxInput));
  const sumExps = expValues.reduce((sum, value) => sum + value, 0);
  return Math.exp(x - maxInput) / sumExps;
}

export function softmaxDerivative(i: number, values: number[]): number {
  const softmaxValues = values.map((value) => softmax(value, values));
  const derivative = softmaxValues[i] * (1 - softmaxValues[i]);

  return derivative;
}
