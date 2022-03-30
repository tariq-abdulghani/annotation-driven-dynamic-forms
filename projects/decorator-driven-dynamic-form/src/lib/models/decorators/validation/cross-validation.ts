import { ValidatorFn } from '@angular/forms';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

type AssociatedInputs = {
  input: string;
  errorConfig: {
    err: string;
    message: string;
  };
};
type ValidationSpec = {
  id: string;
  message?: string;
  validatorFn: ValidatorFn;
  inputs: AssociatedInputs[];
};
export class CrossValidator {
  constructor(public spec: ValidationSpec) {}
}
export function CrossValidation(spec: ValidationSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    //@ts-ignore
    constructor[spec.id] = new CrossValidator(spec);
    return constructor;
  };
}

export class CrossValidationProcessor {
  public static process(formEntity: any): CrossValidator[] {
    // console.log('formEntity', formEntity, formEntity.constructor);
    const validators: CrossValidator[] = [];
    Object.keys(formEntity.constructor).forEach((key) => {
      if (formEntity.constructor[key] instanceof CrossValidator) {
        validators.push(formEntity.constructor[key]);
      }
    });
    return validators;
  }
}
