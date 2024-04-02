export type Group = "Group 1" | "Group 2" | "Group 3" | "Group 4" | "";

export class Point {
  x: number = 0;
  y: number = 0;
  group: Group = "";

  constructor(x: number, y: number, group: Group) {
    this.x = x;
    this.y = y;
    this.group = group;
  }
}
