import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { take } from "rxjs";

import { CarsService } from "../../../shared/services/cars.service";
import { Car, CreateCarRequest } from "../../../interfaces/cars.interfaces";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { AbstractCreateUpdateComponent } from "../../../shared/components/abstract-create-update/abstract-create-update.component";
import { FormFieldConfig } from "../../../shared/components/abstract-create-update/base-create-update.interfaces";

@Component({
  selector: "app-edit-car",
  standalone: true,
  imports: [AbstractCreateUpdateComponent, HeaderComponent],
  providers: [CarsService],
  template: ` <app-header [title]="headerTitle"></app-header>
    <app-abstract-create-update
      #form
      [formConfig]="formConfig"
      (submitForm)="submitForm($event)"
    ></app-abstract-create-update>`,
})
export class EditCarComponent implements OnInit {
  private _form?: FormGroup;
  private _carId: string | null = null;

  @ViewChild("form") public set form(
    content: AbstractCreateUpdateComponent<Car>
  ) {
    if (content) {
      this._form = content.form;
    }
  }

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

  public get headerTitle(): string {
    return "Editar carro " + (this._carId ? ` #${this._carId}` : "");
  }

  constructor(
    protected readonly _route: ActivatedRoute,
    private readonly _carsService: CarsService
  ) {}

  protected prefetchItemData(id: string): void {
    this._carsService
      .getCarById(id)
      .pipe(take(1))
      .subscribe((data) => {
        this._form?.patchValue(data);
      });
  }

  public submitForm(data: CreateCarRequest): void {
    if (!this._carId) {
      return;
    }

    const payload: Car = {
      ...data,
      id: this._carId,
    };

    this._carsService
      .updateCar(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          // this.showSuccess("Carro atualizado com sucesso!");
          // this.goBack();
        },
        error: () => {
          // this.showError("Erro ao atualizar carro!")
        },
      });

    // if (!this.formIsValid) {
    //   return this.showError("Erro ao editar carro!");
    // }
    // this._carsService
    //   .updateCar({ ...this.form.value })
    //   .pipe(take(1))
    //   .subscribe({
    //     next: () => {
    //       this.showSuccess("Carro atualizado com sucesso!");
    //       this.goBack();
    //     },
    //     error: () => this.showError("Erro ao atualizar carro!"),
    //   });
  }

  private initRouteListener(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get("id");

      if (id) {
        this._carId = id;
        this.prefetchItemData(id);
      }
    });
  }

  public ngOnInit(): void {
    this.initRouteListener();
  }
}
