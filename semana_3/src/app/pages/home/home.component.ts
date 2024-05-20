import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { HeaderComponent } from "../../shared/components/header/header.component";
import { ChartComponent } from "../../shared/components/chart/chart.component";
import {
  ChartConfig,
  ChartData,
} from "../../shared/components/chart/chart.interfaces";

import { PartsService } from "../../shared/services/parts.service";
import { CarsService } from "../../shared/services/cars.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HeaderComponent, ChartComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.less",
})
export class HomeComponent implements OnInit {
  public title: string = "Bem vindo ao Super Peças!";

  public readonly topKcarsWithMostParts$: Observable<ChartData[]> =
    this._partsService.listTopKCarsWithMostParts().pipe(
      take(1),
      map((response) =>
        response.map(({ carro, quantidade }) => {
          return {
            label: carro,
            y: quantidade,
          };
        })
      )
    );

  public readonly topKManufacturers$: Observable<ChartData[]> =
    this._carsService.listTopKManufacturers().pipe(
      take(1),
      map((response) =>
        response.map(({ fabricante, quantidade }) => ({
          label: fabricante,
          y: quantidade,
        }))
      )
    );

  public readonly topKCarsWithMostParts: ChartConfig = {
    title: "Carros e peças",
    type: "bar",
    xLabel: "Carros",
    yLabel: "Peças",
    data$: this.topKcarsWithMostParts$,
  };

  public readonly topKManufacturers: ChartConfig = {
    title: "Fabricantes e peças",
    type: "pie",
    xLabel: "Fabricantes",
    yLabel: "Peças",
    data$: this.topKManufacturers$,
    formatter: (label: string, value: string) => {
      return `${label} - ${value}`;
    },
  };

  constructor(
    private readonly _partsService: PartsService,
    private readonly _carsService: CarsService
  ) {}

  public ngOnInit(): void {}
}
