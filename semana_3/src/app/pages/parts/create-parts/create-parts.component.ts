import { Component } from "@angular/core";
import { Validators } from "@angular/forms";

import { take } from "rxjs";

import { HeaderComponent } from "../../../shared/components/header/header.component";
import { BaseCreateUpdateComponent } from "../../../shared/components/base-create-update/base-create-update.component";
import { FormFieldConfig } from "../../../shared/components/base-create-update/base-create-update.interfaces";
import { CreatePartsRequest } from "../../../interfaces/parts.interfaces";
import { CarsService } from "../../../shared/services/cars.service";
import { PartsService } from "../../../shared/services/parts.service";
import { NavigationService } from "../../../shared/services/navigation.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "app-create-parts",
  standalone: true,
  imports: [HeaderComponent, BaseCreateUpdateComponent],
  providers: [CarsService],
  template: `
    <app-header [title]="headerTitle"></app-header>
    <app-base-create-update
      [formConfig]="formConfig"
      (submitForm)="submitForm($event)"
    ></app-base-create-update>
  `,
})
export class CreatePartsComponent {
  public readonly carsList$ = this._carService.listCars().pipe(take(1));
  public readonly formConfig: FormFieldConfig<CreatePartsRequest>[] = [
    {
      key: "nome",
      label: "Nome",
      placeholder: "Ex: Pneu",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "descricao",
      label: "Descrição",
      placeholder: "Ex: Pneu aro 17",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "numeroSerie",
      label: "Número de Série",
      placeholder: "Ex: 123456",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "fabricante",
      label: "Fabricante",
      placeholder: "Ex: Michelin",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "carroId",
      label: "Carro",
      placeholder: "Selecione um carro",
      validators: [Validators.required],
      requestOptions: {
        valueField: "id",
        displayField: "nomeModelo",
        list$: this._carService.listCars().pipe(take(1)),
      },
    },
    {
      key: "modeloCarro",
      label: "Modelo do carro",
      placeholder: "Ex: Gol",
      validators: [Validators.required, Validators.maxLength(255)],
    },
  ];

  public get headerTitle(): string {
    return "Adicionar peça";
  }

  constructor(
    private readonly _carService: CarsService,
    private readonly _partsService: PartsService,
    private readonly _navigationService: NavigationService,
    private readonly _notificationService: NotificationService
  ) {}

  public submitForm(payload: CreatePartsRequest): void {
    this._partsService
      .createPart({ ...payload })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._notificationService.showSuccess("Peça adicionada com sucesso!");
          this._navigationService.goBack();
        },
        error: () => {
          this._notificationService.showError("Erro ao adicionar peça!");
        },
      });
  }
}
