import {
  Input,
  Output,
  Component,
  ViewChild,
  EventEmitter,
} from "@angular/core";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmationService } from "primeng/api";
import { Table, TableLazyLoadEvent, TableModule } from "primeng/table";

import {
  TableColumn,
  SearchParams,
  PaginationConfig,
} from "./base-list.interfaces";

@Component({
  selector: "app-base-list",
  standalone: true,
  imports: [MatIconModule, TableModule, MatButtonModule],
  templateUrl: "./base-list.component.html",
  styleUrl: "./base-list.component.less",
})
export class BaseListComponent<T> {
  @Input() public model?: T;
  @Input() public tableData: T[] = [];
  @Input() public columns: TableColumn<T>[] = [];
  @Input() public paginationConfig: PaginationConfig = {};

  @Output() public deleteItem: EventEmitter<T> = new EventEmitter<T>();
  @Output() public editItem: EventEmitter<T> = new EventEmitter<T>();
  @Output() public fetchItems: EventEmitter<SearchParams> =
    new EventEmitter<SearchParams>();

  @ViewChild("dt") public tableRef?: Table;

  public pageSize = 10;
  public currentPage = 1;

  constructor(private readonly _confirmationService: ConfirmationService) {}

  public onPageChange({ first, rows }: TableLazyLoadEvent): void {
    const page = first ?? this.currentPage;
    const size = rows ?? this.pageSize;

    this.currentPage = Math.floor(page / size) + 1;
    this.pageSize = size;

    this.fetchItems.emit({
      page: this.currentPage.toString(),
      size: this.pageSize.toString(),
    });
  }

  public resetPagination(): void {
    this.currentPage = 1;

    if (this.tableRef) {
      this.tableRef.first = 1;
    }
  }

  public onEditItem(item: T): void {
    this.editItem.emit(item);
  }

  public onDeleteItem(item: T): void {
    this._confirmationService.confirm({
      acceptLabel: "Sim",
      rejectLabel: "Não",
      message: "Tem certeza que deseja excluir este item?",
      accept: () => this.deleteItem.emit(item),
    });
  }
}
