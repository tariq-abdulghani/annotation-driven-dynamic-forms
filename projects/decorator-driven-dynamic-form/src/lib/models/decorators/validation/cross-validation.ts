import { ValidatorFn } from '@angular/forms';

type Effect = {
  input: string;
  message: string;
};
type CrossValidationSpec = {
  errorName: string;
  effects: Effect[];
  validatorFn: ValidatorFn;
  
};

export class CrossValidator {
  constructor(public spec: CrossValidationSpec) {}
}
export function CrossValidation(spec: CrossValidationSpec) {
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
