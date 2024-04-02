import {
  Chart,
  registerables,
  LinearScale,
  BubbleDataPoint,
  ChartTypeRegistry,
  ScatterDataPoint,
} from "chart.js";
import { Point } from "../models/Point";
import zoomPlugin from "chartjs-plugin-zoom";
import { Mode } from "chartjs-plugin-zoom/types/options";

Chart.register(LinearScale);

Chart.register(...registerables);
Chart.register(zoomPlugin);

export class ChartView {
  _parentElement = document.querySelector("#chart-container");
  _canvas = document.querySelector("#chart") as HTMLCanvasElement;
  _context = this._canvas.getContext("2d") as CanvasRenderingContext2D;
  _chart: Chart | null = null;

  constructor() {
    this._initChart();
  }
  _initChart(): void {
    const config = {
      type: "scatter" as const,
      data: {
        datasets: [
          {
            label: "Group 1",
            data: [],
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Group 2",
            data: [],
            backgroundColor: "rgba(20, 99, 132, 1)",
          },
          {
            label: "Group 3",
            data: [],
            backgroundColor: "rgba(5, 200, 132, 1)",
          },
          {
            label: "Group 4",
            data: [],
            backgroundColor: "rgba(10, 109, 3, 1)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear" as const,
            position: "bottom" as const,
            min: 0,
            max: 100,
          },
          y: {
            type: "linear" as const,
            min: 0,
            max: 100,
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: false,
              },
              pan: {
                enabled: false,
              },
              mode: "xy" as "x" | "y" | "xy",
            },
            limits: {
              y: { min: 0, max: 100 },
              x: { min: 0, max: 100 },
            },
          },
        },
      },
    };

    this._chart = new Chart(this._context, config);
  }

  addOnClickEventListener(handler: (point: Point) => void) {
    if (this._chart === null) return;
    this._canvas.addEventListener("click", (event) => {
      const rect = this._canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const chartArea = this._chart?.chartArea;
      if (!chartArea) return;

      if (
        x > chartArea.left &&
        x < chartArea.right &&
        y > chartArea.top &&
        y < chartArea.bottom
      ) {
        const xValue = (this._chart as Chart).scales.x.getValueForPixel(x);
        const yValue = (this._chart as Chart).scales.y.getValueForPixel(y);
        console.log(xValue, yValue);
        if (!xValue || !yValue) {
          throw new Error("Can not process clicking on the chart.");
        }

        handler(new Point(xValue, yValue, ""));
      }
    });
  }

  updateChart = (point: Point): void => {
    this._chart?.data.datasets
      .find((ds) => ds.label === point.group)
      ?.data.push([point.x, point.y]);

    this._chart?.update();
  };
}
