import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Subject, take, takeUntil } from "rxjs";

import { Car, CreateCarRequest } from "../../../interfaces/cars.interfaces";

import { BaseCreateUpdateComponent } from "../../../shared/components/base-create-update/base-create-update.component";
import { FormFieldConfig } from "../../../shared/components/base-create-update/base-create-update.interfaces";
import { HeaderComponent } from "../../../shared/components/header/header.component";

import { CarsService } from "../../../shared/services/cars.service";
import { NavigationService } from "../../../shared/services/navigation.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "app-edit-car",
  standalone: true,
  imports: [BaseCreateUpdateComponent, HeaderComponent],
  template: ` <app-header [title]="headerTitle"></app-header>
    <app-base-create-update
      #form
      [formConfig]="formConfig"
      (submitForm)="submitForm($event)"
    ></app-base-create-update>`,
})
export class EditCarComponent implements OnInit, OnDestroy {
  private _form?: FormGroup;
  private _carId: string | null = null;
  private _destroy$: Subject<void> = new Subject();

  @ViewChild("form") public set form(content: BaseCreateUpdateComponent<Car>) {
    if (content) {
      this._form = content.form;
    }
  }

  public formConfig: FormFieldConfig<Car>[] = [
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
    private readonly _route: ActivatedRoute,
    private readonly _carsService: CarsService,
    private readonly _navigationService: NavigationService,
    private readonly _notificationService: NotificationService
  ) {}

  private prefetchItemData(id: string): void {
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

    this._carsService
      .updateCar({
        ...data,
        id: this._carId,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._notificationService.showSuccess(
            "Carro atualizado com sucesso!"
          );
          this._navigationService.goBack();
        },
        error: () => {
          this._notificationService.showError("Erro ao atualizar carro!");
        },
      });
  }

  private initRouteListener(): void {
    this._route.paramMap
      .pipe(takeUntil(this._destroy$))
      .subscribe((params: ParamMap) => {
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

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
