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

  addListener(callback: (point: Point) => void) {
    this._listeners.push(callback);
  }
}

class State {
  currentSelectedGroup = "Group 2";
  chartState = new DataModel();
}

export default new State();
