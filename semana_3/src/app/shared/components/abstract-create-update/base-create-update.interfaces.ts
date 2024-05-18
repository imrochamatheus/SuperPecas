import { ValidatorFn } from "@angular/forms";

export interface FormFieldConfig<T> {
  key: keyof T;
  label: string;
  hidden?: boolean;
  validators: ValidatorFn[];
}
