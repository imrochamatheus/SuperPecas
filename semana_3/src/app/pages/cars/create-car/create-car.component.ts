import { Component } from "@angular/core";
import { Validators } from "@angular/forms";

import { take } from "rxjs";

import { CreateCarRequest } from "../../../interfaces/cars.interfaces";

import { HeaderComponent } from "../../../shared/components/header/header.component";
import { BaseCreateUpdateComponent } from "../../../shared/components/base-create-update/base-create-update.component";
import { FormFieldConfig } from "../../../shared/components/base-create-update/base-create-update.interfaces";

import { CarsService } from "../../../shared/services/cars.service";

import { NavigationService } from "../../../shared/services/navigation.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "app-create-car",
  standalone: true,
  imports: [HeaderComponent, BaseCreateUpdateComponent],
  template: `
    <app-header [title]="headerTitle"></app-header>
    <app-base-create-update
      [formConfig]="formConfig"
      (submitForm)="submitForm($event)"
    ></app-base-create-update>
  `,
})
export class CreateCarComponent {
  public readonly formConfig: FormFieldConfig<CreateCarRequest>[] = [
    {
      key: "nomeModelo",
      label: "Modelo",
      placeholder: "Ex: Gol",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "fabricante",
      label: "Fabricante",
      placeholder: "Ex: Volkswagen",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "codigoUnico",
      label: "Código único",
      placeholder: "Ex: 123456",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
  ];

  public get headerTitle(): string {
    return "Adicionar carro";
  }

  constructor(
    private readonly _carsService: CarsService,
    private readonly _navigationService: NavigationService,
    private readonly _notificationService: NotificationService
  ) {}

  public submitForm(payload: CreateCarRequest): void {
    this._carsService
      .createCar({ ...payload })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._notificationService.showSuccess(
            "Carro adicionado com sucesso!"
          );
          this._navigationService.goBack();
        },
        error: () => {
          this._notificationService.showError("Erro ao adicionar carro!");
        },
      });
  }
}
