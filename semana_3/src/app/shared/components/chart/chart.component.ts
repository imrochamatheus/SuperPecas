import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  CanvasJSChart,
  CanvasJSAngularChartsModule,
} from "@canvasjs/angular-charts";

import { ChartConfig, ChartData } from "./chart.interfaces";

@Component({
  selector: "app-chart",
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  template: `
    <section style="width: 100%;">
      <canvasjs-chart
        [options]="chartOptions"
        (chartInstance)="setChartInstance($event)"
      ></canvasjs-chart>
    </section>
  `,
})
export class ChartComponent implements OnInit {
  @Input() config: ChartConfig = {} as ChartConfig;

  private _chart?: CanvasJSChart["chart"];
  public chartOptions?: CanvasJSChart["options"];

  constructor() {}

  private listenToDataChanges(): void {
    this.config.data$.subscribe(this.updateChartData.bind(this));
  }

  private buildChartOptions(): void {
    this.chartOptions = {
      title: {
        text: this.config.title,
      },
      animationEnabled: true,
      axisY: {
        title: this.config.yLabel,
        interval: 1,
        includeZero: true,
      },
      axisX: {
        title: this.config.xLabel,
      },
      data: [],
    };
  }

  private updateChartData(data: ChartData[]): void {
    const { formatter } = this.config;

    this.chartOptions.data = [
      {
        type: this.config.type,
        indexLabel: formatter ? formatter("{label}", "{y}") : "",
        dataPoints: data.map((item) => {
          return {
            label: item.label,
            y: item.y,
          };
        }),
      },
    ];

    if (this._chart) {
      this._chart.render();
    }
  }

  public setChartInstance(chart: CanvasJSChart["chart"]): void {
    this._chart = chart;
  }

  public ngOnInit(): void {
    this.buildChartOptions();
    this.listenToDataChanges();
  }
}
