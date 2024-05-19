import { ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

interface RequestOptions {
  list$: Observable<any[]>;
  displayField: string;
  valueField: string;
}

export interface FormFieldConfig<T> {
  key: keyof T;
  label: string;
  hidden?: boolean;
  placeholder?: string;
  validators: ValidatorFn[];
  requestOptions?: RequestOptions;
}
