import { ValidatorFn } from '@angular/forms';

export const CROSS_VALIDATION_METADATA_KEY = Symbol('CrossValidation'); 
type Effect = {
  input: string;
  message: string;
};
type CrossValidationSpec = {
  errorName: string;
  effects: Effect[];
  validatorFn: ValidatorFn;
  
};

export function CrossValidation(spec: CrossValidationSpec): ClassDecorator {
  return target => {
    const crossValidationMeta = Reflect.getMetadata(CROSS_VALIDATION_METADATA_KEY, target);
    if(!crossValidationMeta){
      return Reflect.defineMetadata(CROSS_VALIDATION_METADATA_KEY, [spec], target);
    }else{
      crossValidationMeta.push(spec);
    }
  };
}

export class CrossValidationMeta {
  public static get(formEntity: any): CrossValidationSpec[] | undefined{
    return Reflect.getMetadata(CROSS_VALIDATION_METADATA_KEY, formEntity.constructor);
  }
}
