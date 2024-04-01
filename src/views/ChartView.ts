import { Chart, registerables, LinearScale } from "chart.js";

Chart.register(LinearScale);

Chart.register(...registerables);

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
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear" as const,
            position: "bottom" as const,
          },
          y: {
            type: "linear" as const,
          },
        },
      },
    };

    this._chart = new Chart(this._context, config);
  }
}
