import { Observable } from "rxjs";

export type ChartType = "bar" | "pie";

export interface ChartData {
  label: string;
  y: number;
}

export interface ChartConfig {
  title: string;
  xLabel: string;
  yLabel: string;
  type: ChartType;
  formatter?: (label: string, value: string) => string;
  data$: Observable<ChartData[]>;
}
