import { Group, Point } from "./Point";

class DataModel {
  private _points: Point[] = [];
  private _groups: Group[] = ["Group 1", "Group 2"];
  private _listeners: ((points: Point) => void)[] = [];

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
