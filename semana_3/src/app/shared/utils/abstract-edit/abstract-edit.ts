import { Location } from "@angular/common";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { MessageService } from "primeng/api";

import { CarsService } from "../../services/cars.service";

export abstract class AbstractEdit<T> {
  protected abstract readonly _carService: CarsService;
  protected abstract readonly _route: ActivatedRoute;
  protected abstract readonly _location: Location;
  protected abstract readonly _messageService: MessageService;
  protected abstract _data: T;

  public form!: FormGroup;
  public itemId: string | null = null;

  public abstract formKeys: Record<keyof T, keyof T>;
  public abstract get headerTitle(): string;
  public abstract get formIsValid(): boolean;

  constructor() {}

  protected abstract fetchData(): void;
  protected abstract editItem(): void;
  protected abstract preloadFormValues(): void;

  protected initRouteListener(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.itemId = params.get("id");
      this.fetchData();
    });
  }

  protected showErrorToast(): void {
    this._messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Erro ao atualizar registro",
    });
  }

  protected showSuccessToast(): void {
    this._messageService.add({
      severity: "success",
      summary: "Suceddo!",
      detail: "Atualizado com sucesso",
    });
  }

  public goBack(): void {
    this._location.back();
  }

  public onClear(): void {
    this.form.reset();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.editItem();
    }
  }
}
