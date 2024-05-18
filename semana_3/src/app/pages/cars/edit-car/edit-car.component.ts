import { Component, OnInit, inject } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";

import { take } from "rxjs";

import { MessageService } from "primeng/api";
import { MatButton } from "@angular/material/button";

import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CarsService } from "../../../shared/services/cars.service";
import { Car } from "../../../interfaces/cars.interfaces";

type FormType<T> = Partial<Record<keyof T, FormControl>>;

@Component({
  selector: "app-edit-car",
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatButton],
  providers: [CarsService],
  templateUrl: "./edit-car.component.html",
  styleUrl: "./edit-car.component.less",
})
export class EditCarComponent implements OnInit {
  private readonly _carService: CarsService = inject(CarsService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _location: Location = inject(Location);
  private readonly _messageService: MessageService = inject(MessageService);

  private _carId: string | null = null;

  public itemData: Car = {} as Car;

  public formKeys: Record<keyof Car, keyof Car> = {
    id: "id",
    nomeModelo: "nomeModelo",
    fabricante: "fabricante",
    codigoUnico: "codigoUnico",
  };

  public carForm: FormGroup = new FormGroup<FormType<Car>>({
    nomeModelo: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    fabricante: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    codigoUnico: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });

  public get headerTitle(): string {
    return `Editar o carro ${this._carId}`;
  }

  public get formIsValid(): boolean {
    return this.carForm.valid;
  }

  constructor() {}

  private fillForm() {
    this.carForm.setValue({
      [this.formKeys.nomeModelo]: this.itemData.nomeModelo,
      [this.formKeys.fabricante]: this.itemData.fabricante,
      [this.formKeys.codigoUnico]: this.itemData.codigoUnico,
    });
  }

  private fetchData(): void {
    if (!this._carId) {
      return;
    }

    this._carService
      .getCarById(this._carId)
      .pipe(take(1))
      .subscribe((data) => {
        this.itemData = data;
        this.fillForm();
      });
  }

  private showErrorToast(): void {
    this._messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Erro ao atualizar registro",
    });
  }

  private showSuccessToast(): void {
    this._messageService.add({
      severity: "success",
      summary: "Suceddo!",
      detail: "Atualizado com sucesso",
    });
  }

  private editItem(): void {
    const payload: Car = {
      ...this.carForm.value,
      id: this._carId,
    };

    this._carService
      .updateCar(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccessToast();
          this.goBack();
        },
        error: this.showErrorToast.bind(this),
      });
  }

  private initRouteListener(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this._carId = params.get("id");
      this.fetchData();
    });
  }

  public goBack(): void {
    this._location.back();
  }

  public onClear(): void {
    this.carForm.reset();
  }

  public onSubmit(): void {
    if (this.carForm.valid) {
      this.editItem();
    }
  }

  public ngOnInit(): void {
    this.initRouteListener();
  }
}
