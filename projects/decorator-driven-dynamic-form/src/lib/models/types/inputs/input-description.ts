import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InputTypes } from './input-types.enum';
import { InputMetaData } from './Input-meta-data';

export class InputDescription {
  metaData: InputMetaData;
  control: AbstractControl | null;
  validators: ValidatorFn[];
  errorMap: Map<string, string>;
  childInputs: InputDescription[] | null;
  inputType: InputTypes;
  cloneAndBind(control: AbstractControl): InputDescription {
    const bound = new InputDescription({}, this.inputType);
    bound.control = control;
    bound.validators = this.validators;
    bound.errorMap = this.errorMap;
    bound.childInputs = this.childInputs;
    bound.metaData.setProperties(this.metaData.getProperties());
    return bound;
  }
  addError() {}

  constructor(specs: any, controlType: InputTypes) {
    this.control = null;
    this.errorMap = new Map();
    this.validators = [];
    this.childInputs = null;
    this.inputType = controlType;
    this.metaData = new InputMetaData(specs);
  }
}

