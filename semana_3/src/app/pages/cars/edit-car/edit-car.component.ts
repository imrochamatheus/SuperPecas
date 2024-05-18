import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
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
import { AbstractEdit } from "../../../shared/utils/abstract-edit/abstract-edit";

@Component({
  selector: "app-edit-car",
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatButton],
  providers: [CarsService],
  templateUrl: "./edit-car.component.html",
  styleUrl: "./edit-car.component.less",
})
export class EditCarComponent extends AbstractEdit<Car> implements OnInit {
  protected _data: Car = {} as Car;

  public override form: FormGroup;
  public formKeys: Record<keyof Car, keyof Car> = {
    id: "id",
    nomeModelo: "nomeModelo",
    fabricante: "fabricante",
    codigoUnico: "codigoUnico",
  };

  public get headerTitle(): string {
    return `Editar o carro ${this.itemId}`;
  }
  public get formIsValid(): boolean {
    return this.form.valid;
  }

  constructor(
    protected readonly _messageService: MessageService,
    protected readonly _carService: CarsService,
    protected readonly _route: ActivatedRoute,
    protected readonly _location: Location
  ) {
    super();

    this.form = new FormGroup({
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
  }

  protected preloadFormValues(): void {
    this.form.patchValue({
      [this.formKeys.nomeModelo]: this._data.nomeModelo,
      [this.formKeys.fabricante]: this._data.fabricante,
      [this.formKeys.codigoUnico]: this._data.codigoUnico,
    });
  }

  protected fetchData(): void {
    if (!this.itemId) {
      return;
    }

    this._carService
      .getCarById(this.itemId)
      .pipe(take(1))
      .subscribe((data) => {
        this._data = data;
        this.preloadFormValues();
      });
  }

  protected editItem(): void {
    const payload: Car = {
      ...this.form.value,
      id: this.itemId,
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

  public ngOnInit(): void {
    this.initRouteListener();
  }
}
