import { Component, inject } from "@angular/core";
import { Validators } from "@angular/forms";

import { take } from "rxjs";

import { CreateCarRequest } from "../../../interfaces/cars.interfaces";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CarsService } from "../../../shared/services/cars.service";
import { AbstractCreateUpdateComponent } from "../../../shared/components/abstract-create-update/abstract-create-update.component";
import { FormFieldConfig } from "../../../shared/components/abstract-create-update/base-create-update.interfaces";

@Component({
  selector: "app-create-car",
  standalone: true,
  imports: [HeaderComponent, AbstractCreateUpdateComponent],
  template: `
    <app-header [title]="headerTitle"></app-header>
    <app-abstract-create-update
      [formConfig]="formConfig"
      (submitForm)="submitForm($event)"
    ></app-abstract-create-update>
  `,
})
export class CreateCarComponent {
  private readonly _carsService = inject(CarsService);
  public formConfig: FormFieldConfig<CreateCarRequest>[] = [
    {
      key: "nomeModelo",
      label: "Modelo",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "fabricante",
      label: "Fabricante",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
    {
      key: "codigoUnico",
      label: "Código único",
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],
    },
  ];
  //
  public get headerTitle(): string {
    return "Adicionar carro";
  }

  constructor() {}

  public submitForm(payload: CreateCarRequest): void {
    this._carsService
      .createCar({ ...payload })
      .pipe(take(1))
      .subscribe({
        next: () => {
          // this.showSuccess("Atualizado com sucesso");
          // this.goBack();
          console.log("Carro adicionado com sucesso!");
        },
        error: () => {
          console.log("Erro ao adicionar carro!");
          // this.showError("Erro ao adicionar carro!")
        },
      });
  }
}
