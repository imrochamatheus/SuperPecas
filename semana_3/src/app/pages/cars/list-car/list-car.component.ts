import {
  OnInit,
  inject,
  Component,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { finalize, take } from "rxjs";

import { ButtonModule } from "primeng/button";
import { Table, TableModule } from "primeng/table";

import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ConfirmationService, MessageService } from "primeng/api";

import { Car } from "../../../interfaces/cars.interfaces";
import { CarsService } from "../../../shared/services/cars.service";
import { AbstractList } from "../../../shared/utils/abstract-list/abstract-list";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: "app-list-car",
  standalone: true,
  imports: [
    MatButton,
    TableModule,
    FormsModule,
    ButtonModule,
    RouterOutlet,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent,
    MatFormFieldModule,
  ],
  providers: [CarsService],
  templateUrl: "./list-car.component.html",
  styleUrl: "./list-car.component.less",
})
export class ListCarComponent extends AbstractList<Car> implements OnInit {
  private readonly _carsService: CarsService = inject(CarsService);
  private readonly _router = inject(Router);

  protected override readonly _confirmationService: ConfirmationService =
    inject(ConfirmationService);

  protected override readonly _messageService: MessageService =
    inject(MessageService);

  @ViewChild("dt") public tableRef?: Table;

  public override columns: {
    key: keyof Car;
    label: string;
  }[] = [
    { key: "nomeModelo", label: "Nome do Modelo" },
    { key: "fabricante", label: "Fabricante" },
    { key: "codigoUnico", label: "Código Único" },
  ];

  constructor() {
    super();
  }

  private showErrorDialog(message: string): void {
    this._messageService.add({
      severity: "error",
      summary: "Erro!",
      detail: message,
    });
  }

  public override fetchItens(): void {
    this.loading = true;

    this._carsService
      .listCarsByTermWithPagination(
        this.searchTerm,
        String(this.currentPage),
        String(this.pageSize)
      )
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: ({ content, ...pagination }) => {
          this.items = content;
          this.paginationProperties = pagination;
        },
        error: () => this.showErrorDialog("Erro ao listar itens!"),
      });
  }

  public override onEditItem(item: Car): void {
    this._router.navigate(["cars", item.id, "edit"]);
  }

  public override onDeleteItem(item: Car): void {
    this._carsService
      .deleteCar(item.id)
      .pipe(take(1))
      .subscribe({
        next: this.fetchItens.bind(this),
        error: (err) => this.showErrorDialog(err.error),
      });
  }

  public ngOnInit(): void {
    this.fetchItens();
  }
}
