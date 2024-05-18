import { inject } from "@angular/core";

import { TableLazyLoadEvent } from "primeng/table";

import { PaginationProperties } from "../../../interfaces/pagination.interfaces";
import { ConfirmationService } from "primeng/api";

export abstract class AbstractList<T> {
  private readonly _confirmationService: ConfirmationService =
    inject(ConfirmationService);

  public abstract readonly columns: {
    key: keyof T;
    label: string;
  }[];

  public items: T[] = [];
  public loading = false;
  public pageSize = 10;
  public currentPage = 1;
  public searchTerm = "";
  public paginationProperties: PaginationProperties = {};

  constructor() {}

  public abstract fetchItens(): void;
  public abstract onEditItem(item: T): void;
  public abstract onDeleteItem(item: T): void;

  private updatePageAndSize({ first, rows }: TableLazyLoadEvent): void {
    const page = first ?? this.currentPage;
    const size = rows ?? this.pageSize;

    this.currentPage = Math.floor(page / size) + 1;
    this.pageSize = size;

    this.fetchItens();
  }

  public openDeleteDialog(item: T): void {
    this._confirmationService.confirm({
      message: "Deseja realmente deletar o item de id: " + (item as any)["id"],
      accept: () => this.onDeleteItem(item),
    });
  }

  public search(): void {
    this.currentPage = 1;

    this.fetchItens();
  }

  public pageChange(event: TableLazyLoadEvent): void {
    this.updatePageAndSize(event);
  }
}
