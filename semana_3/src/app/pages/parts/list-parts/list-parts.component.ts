import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { take } from "rxjs";

import { ButtonModule } from "primeng/button";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { Part } from "../../../interfaces/parts.interfaces";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { BaseListComponent } from "../../../shared/components/base-list/base-list.component";
import {
  TableColumn,
  SearchParams,
  ActionOutput,
  PaginationConfig,
} from "../../../shared/components/base-list/base-list.interfaces";
import { PartsService } from "../../../shared/services/parts.service";
import { NavigationService } from "../../../shared/services/navigation.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "app-list-parts",
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    BaseListComponent,
  ],
  templateUrl: "./list-parts.component.html",
  styleUrl: "./list-parts.component.less",
})
export class ListPartsComponent {
  @ViewChild(BaseListComponent) public baseList!: BaseListComponent<Part>;

  public tableData: Part[] = [];
  public searchTerm = "";
  public paginationProperties: PaginationConfig = {};
  public tableColumns: TableColumn<Part>[] = [
    { key: "id", label: "Id" },
    { key: "nome", label: "Nome" },
    { key: "descricao", label: "Descrição" },
    { key: "numeroSerie", label: "Número de série" },
    { key: "fabricante", label: "Fabricante" },
    { key: "carroId", label: "Carro", formatter: this.carFormatter },
    { key: "modeloCarro", label: "Modelo do carro" },
  ];

  constructor(
    private readonly _partsService: PartsService,
    private readonly _navigationService: NavigationService,
    private readonly _notificationService: NotificationService
  ) {}

  public carFormatter(part: Part): string {
    return `${part.carroFabricante} - ${part.carroNomeModelo}`;
  }

  public deleteConfirmMessageFn(item: Part): string {
    return `Deseja realmente remover a peça ${item.nome}?`;
  }

  public fetchItens({ term = "", page, size }: SearchParams): void {
    this._partsService
      .listPartsByTermWithPagination(term, page, size)
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

  public onEditItem({ item }: ActionOutput<Part>): void {
    this._navigationService.navigateTo(["parts", item.id, "edit"]);
  }

  public redirectToCreation(): void {
    this._navigationService.navigateTo(["parts", "create"]);
  }

  public onDeleteItem({ item, page, size }: ActionOutput<Part>): void {
    this._partsService.deletePart(item.id).subscribe({
      next: () => {
        this._notificationService.showSuccess("Peça deletada com sucesso!");
        this.fetchItens({ term: this.searchTerm, page, size });
      },
      error: () => this._notificationService.showError("Erro ao deletar peça!"),
    });
  }
}
