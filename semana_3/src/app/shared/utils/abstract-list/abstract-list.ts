import { Table, TableLazyLoadEvent } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";

import { PaginationProperties } from "../../../interfaces/pagination.interfaces";

export abstract class AbstractList<T extends Object> {
  protected abstract _messageService: MessageService;
  protected abstract _confirmationService: ConfirmationService;

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

  public abstract tableRef?: Table;

  private updatePageAndSize({ first, rows }: TableLazyLoadEvent): void {
    const page = first ?? this.currentPage;
    const size = rows ?? this.pageSize;

    this.currentPage = Math.floor(page / size) + 1;
    this.pageSize = size;

    this.fetchItens();
  }

  private showErrorMessage(detail: string) {
    this._messageService.add({
      severity: "error",
      summary: "Erro!",
      detail,
    });
  }

  private resetTablePagination(): void {
    this.currentPage = 1;

    if (this.tableRef) {
      this.tableRef.first = 1;
    }
  }

  public abstract fetchItens(): void;
  public abstract onEditItem(item: T): void;
  public abstract onDeleteItem(item: T): void;

  public openDeleteDialog(item: T): void {
    if ("id" in item) {
      this._confirmationService.confirm({
        message: "Deseja realmente deletar o item de id: " + item["id"],
        accept: () => this.onDeleteItem(item),
      });

      return;
    }

    this.showErrorMessage(
      "Ops! Houve um problema ao tentar deletar este item!"
    );
  }

  public search(): void {
    this.resetTablePagination();
    this.fetchItens();
  }

  public pageChange(event: TableLazyLoadEvent): void {
    this.updatePageAndSize(event);
  }
}
