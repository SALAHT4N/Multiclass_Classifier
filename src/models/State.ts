import { Group, Point } from "./Point";

class DataModel {
  private _points: Point[] = [];
  private _groups: Group[] = ["Group 1", "Group 2"];
  private _listeners: ((points: Point) => void)[] = [];
  public alpha = 0.1;

  public addPoint(point: Point): void {
    this._points.push(point);
    if (this._listeners !== null)
      this._listeners?.forEach((callback) => {
        callback(point);
      });
  }

  public getGroups(): Group[] {
    return [...this._groups];
  }

  public getPoints(): Point[] {
    return [
      { x: 2, y: 1, group: "Group 1" },
      { x: 3, y: 1, group: "Group 1" },
      { x: 4, y: 1, group: "Group 1" },
      { x: 5, y: 1, group: "Group 1" },
      { x: 6, y: 1, group: "Group 1" },
      { x: 7, y: 1, group: "Group 1" },
      { x: 1, y: 2, group: "Group 2" },
      { x: 1, y: 3, group: "Group 2" },
      { x: 1, y: 4, group: "Group 2" },
      { x: 1, y: 5, group: "Group 2" },
      { x: 1, y: 6, group: "Group 2" },
    ];
    return [...this._points];
  }

  public addListener(callback: (point: Point) => void) {
    this._listeners.push(callback);
  }
}

class State {
  currentSelectedGroup: Group = "Group 2";
  dataModel = new DataModel();
}

export default new State();
