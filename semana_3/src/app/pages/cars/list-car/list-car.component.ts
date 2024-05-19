import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { take } from "rxjs";

import { ButtonModule } from "primeng/button";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { Car } from "../../../interfaces/cars.interfaces";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CarsService } from "../../../shared/services/cars.service";
import { BaseListComponent } from "../../../shared/components/base-list/base-list.component";
import { NavigationService } from "../../../shared/services/navigation.service";
import {
  TableColumn,
  SearchParams,
  PaginationConfig,
} from "../../../shared/components/base-list/base-list.interfaces";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "app-list-car",
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    BaseListComponent,
  ],
  templateUrl: "./list-car.component.html",
  styleUrl: "./list-car.component.less",
})
export class ListCarComponent {
  @ViewChild(BaseListComponent) public baseList!: BaseListComponent<Car>;

  public tableData: Car[] = [];
  public searchTerm = "";
  public paginationProperties: PaginationConfig = {};
  public tableColumns: TableColumn<Car>[] = [
    { key: "nomeModelo", label: "Modelo" },
    { key: "fabricante", label: "Fabricante" },
    { key: "codigoUnico", label: "Código Único" },
  ];

  constructor(
    private readonly _carsService: CarsService,
    private readonly _navigationService: NavigationService,
    private readonly _notificationService: NotificationService
  ) {}

  public deleteConfirmMessageFn(item: Car): string {
    return `Deseja realmente remover o carro ${item.nomeModelo}?`;
  }

  public fetchItens({ term = "", page, size }: SearchParams): void {
    this._carsService
      .listCarsByTermWithPagination(term, page, size)
      .pipe(take(1))
      .subscribe({
        next: ({ content, ...pagination }) => {
          this.tableData = content;
          this.paginationProperties = pagination;
        },
        error: () =>
          this._notificationService.showError("Erro ao listar carros!"),
      });
  }

  public searchByTerm(): void {
    const rows = this.baseList.tableRef?._rows ?? 10;
    this.baseList.tableRef?.reset();

    this.fetchItens({
      page: String(1),
      size: String(rows),
      term: this.searchTerm,
    });
  }

  public onEditItem(item: Car): void {
    this._navigationService.navigateTo(["cars", item.id, "edit"]);
  }

  public redirectToCreation(): void {
    this._navigationService.navigateTo(["cars", "create"]);
  }

  public onDeleteItem(item: Car): void {
    this._carsService.deleteCar(item.id).subscribe({
      next: () => this.fetchItens.bind(this),
      error: () =>
        this._notificationService.showError("Erro ao deletar carro!"),
    });
  }
}
