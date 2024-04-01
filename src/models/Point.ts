export class Point {
  x: number = 0;
  y: number = 0;
  group: string = "";

  constructor(x: number, y: number, group: string) {
    this.x = x;
    this.y = y;
    this.group = group;
  }
}
