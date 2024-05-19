import { Component, ViewChild } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { take, takeUntil, Subject } from "rxjs";

import { CreatePartsRequest, Part } from "../../../interfaces/parts.interfaces";

import { BaseCreateUpdateComponent } from "../../../shared/components/base-create-update/base-create-update.component";
import { FormFieldConfig } from "../../../shared/components/base-create-update/base-create-update.interfaces";
import { HeaderComponent } from "../../../shared/components/header/header.component";

import { CarsService } from "../../../shared/services/cars.service";
import { NavigationService } from "../../../shared/services/navigation.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { PartsService } from "../../../shared/services/parts.service";

@Component({
  selector: "app-edit-parts",
  standalone: true,
  imports: [HeaderComponent, BaseCreateUpdateComponent],
  template: `
    <app-header [title]="headerTitle"></app-header>
    <app-base-create-update
      #form
      [formConfig]="formConfig"
      (submitForm)="submitForm($event)"
    ></app-base-create-update>
  `,
})
export class EditPartsComponent {
  private _form?: FormGroup;
  private _partId: string | null = null;
  private _destroy$: Subject<void> = new Subject();

  @ViewChild("form") public set form(content: BaseCreateUpdateComponent<Part>) {
    if (content) {
      this._form = content.form;
    }
  }

  public formConfig: FormFieldConfig<Part>[] = [
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
        list$: this._carsService.listCars().pipe(take(1)),
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
    return "Editar peça " + (this._partId ? ` #${this._partId}` : "");
  }

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _carsService: CarsService,
    private readonly _partsService: PartsService,
    private readonly _navigationService: NavigationService,
    private readonly _notificationService: NotificationService
  ) {}

  private prefetchItemData(id: string): void {
    this._partsService
      .getPartById(id)
      .pipe(take(1))
      .subscribe((data) => {
        this._form?.patchValue(data);
      });
  }

  public submitForm(data: CreatePartsRequest): void {
    if (!this._partId) {
      return;
    }

    this._partsService
      .updatePart({
        ...data,
        id: this._partId,
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
          this._partId = id;
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
