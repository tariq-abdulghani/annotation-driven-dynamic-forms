import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InputTypes } from './input-types.enum';

export class InputDescription<T> {
  meta: T;
  control: AbstractControl | null;
  validators: ValidatorFn[];
  errorMap: Map<string, string>;
  childInputs: InputDescription<any>[] | null;
  inputType: InputTypes;
  cloneAndBind(control: AbstractControl): InputDescription<T> {
    return {
      ...this,
      control: control,
    };
  }
  addError() {}

  constructor(meta: T, controlType: InputTypes) {
    this.meta = meta;
    this.control = null;
    this.errorMap = new Map();
    this.validators = [];
    this.childInputs = null;
    this.inputType = controlType;
  }
}
