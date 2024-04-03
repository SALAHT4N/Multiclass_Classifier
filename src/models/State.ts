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
  public addGroup(): Group {
    if (this._groups.length == 4) throw new Error("Maximum number of groups");

    const tokens: string[] = this._groups[this._groups.length - 1].split(" ");
    const newGroupNumber = Number(tokens[1]) + 1;
    const newGroup: Group = (tokens[0] + " " + newGroupNumber) as Group;
    this._groups.push(newGroup);

    return newGroup;
  }

  public removeGroup(): Group {
    if (this._groups.length == 2) throw new Error("Minimum number of groups");

    return this._groups.splice(-1)[0];
  }
  public getGroups(): Group[] {
    return [...this._groups];
  }

  public getPoints(): Point[] {
    return [...this._points];
  }

  public removePoints(...groups: Group[]): void {
    this._points = this._points.filter(
      (point) => !groups.includes(point.group)
    );
  }

  public addListener(callback: (point: Point) => void) {
    this._listeners.push(callback);
  }
}

class State {
  currentSelectedGroup: Group = "Group 1";
  dataModel = new DataModel();
}

export default new State();
