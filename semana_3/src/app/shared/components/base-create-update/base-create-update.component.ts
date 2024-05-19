import { CommonModule, Location } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { MatButton } from "@angular/material/button";
import { MessageService } from "primeng/api";

import { Observable } from "rxjs";

import { HeaderComponent } from "../header/header.component";
import { FormFieldConfig } from "./base-create-update.interfaces";

@Component({
  selector: "app-base-create-update",
  standalone: true,
  imports: [MatButton, CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: "./base-create-update.component.html",
  styleUrl: "./base-create-update.component.less",
})
export class BaseCreateUpdateComponent<T> implements OnInit {
  @Input() public preloadFormValues?: T;
  @Input() public formConfig!: FormFieldConfig<T>[];

  @Output() public submitForm: EventEmitter<T> = new EventEmitter<T>();

  public form: FormGroup = new FormGroup({});

  public get formIsValid(): boolean {
    return this.form.valid;
  }

  carOptions$: Observable<string[]> = new Observable<string[]>();

  constructor(
    private readonly _messageService: MessageService,
    private readonly _location: Location
  ) {}

  private showError(message: string): void {
    this.showToast("error", "Erro", message);
  }

  private createFormGroup(config: FormFieldConfig<T>[]): FormGroup {
    const group: Record<keyof T, FormControl> = {} as Record<
      keyof T,
      FormControl
    >;

    config.forEach((field) => {
      group[field.key] = new FormControl("", field.validators);
    });

    return new FormGroup(group);
  }

  private showToast(severity: string, summary: string, detail: string): void {
    this._messageService.add({
      severity,
      summary,
      detail,
    });
  }

  private buildFormConfiguration(): void {
    this.form = this.createFormGroup(this.formConfig);
  }

  public getFieldError(field: keyof T): string {
    const control = this.form.get(field as string);

    if (control?.touched && control?.invalid) {
      if (control.errors?.["required"]) {
        return "Campo obrigatório.";
      }
      if (control.errors?.["minlength"]) {
        return `O campo deve possuir pelo menos  (${control.errors["minlength"].requiredLength} caracteres).`;
      }
      if (control.errors?.["maxlength"]) {
        return `O campo deve possuir até (${control.errors["maxlength"].requiredLength} caracteres).`;
      }
    }

    return "";
  }

  public onSubmit(): void {
    if (!this.formIsValid) {
      return this.showError("Erro ao adicionar carro!");
    }
    this.submitForm.emit(this.form.value);
  }

  public goBack(): void {
    this._location.back();
  }

  public clearForm(): void {
    this.form.reset();
  }

  public ngOnInit(): void {
    if (this.formConfig) {
      this.buildFormConfiguration();
    }
  }
}
