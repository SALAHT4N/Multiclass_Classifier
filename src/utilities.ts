export function generateRandomValue(start: number, end: number) {
  return Math.random() * (end - start) + start;
}

export type MathematicalFunction = (input: number) => number;
export function errorResolverDecoratorFunction(handler: any) {
  try {
    handler();
  } catch (e) {
    alert((e as Error).message);
  }
}
