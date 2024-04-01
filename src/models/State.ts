import { Point } from "./Point";

class DataModel {
  _points: Point[] = [];
  _listeners: ((points: Point) => void)[] = [];

  addPoint(point: Point): void {
    this._points.push(point);
    if (this._listeners !== null)
      this._listeners?.forEach((callback) => {
        callback(point);
      });
  }

  addListener(fn: (point: Point) => void) {
    this._listeners.push(fn);
  }
}

class State {
  currentSelectedGroup: string = "Group 1";
  chartState: DataModel = new DataModel();
}

export default new State();
