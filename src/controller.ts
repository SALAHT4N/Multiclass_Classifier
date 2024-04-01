import "./style.css";
import { ChartView } from "./views/ChartView";
import state from "./models/State";
import { Point } from "./models/Point";

const chart: ChartView = new ChartView();

function onClickChartHandler(point: Point) {
  point.group = state.currentSelectedGroup;
  state.chartState.addPoint(point);
}

function init(): void {
  chart.addOnClickEventListener(onClickChartHandler);
  state.chartState.addListener(chart.updateChart);
}

init();
