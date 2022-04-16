import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

export const ASYNC_VALIDATION_METADATA_KEY = Symbol('AsyncValidationSpec');

export interface AsyncValidator {
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors>;
}

export interface InjectableAsyncValidatorProvider {
  provider: any;
}
export type AsyncValidationSpec = {
  validator:
    | AsyncValidator
    | AsyncValidatorFn
    | InjectableAsyncValidatorProvider;
  errorMessage: string;
  errorName: string;
};
export class AsyncValidationMeta {
  public static add(
    validationSpec: AsyncValidationSpec,
    target: any,
    propertyKey: string
  ) {
    const validationMeta = Reflect.getMetadata(
      ASYNC_VALIDATION_METADATA_KEY,
      target,
      propertyKey
    ) as AsyncValidationSpec[] | undefined;
    if (validationMeta) {
      validationMeta.push(validationSpec);
    } else {
      Reflect.defineMetadata(
        ASYNC_VALIDATION_METADATA_KEY,
        [validationSpec],
        target,
        propertyKey
      );
    }
  }
  public static get(target: any, propertyKey: string) {
    return Reflect.getMetadata(
      ASYNC_VALIDATION_METADATA_KEY,
      target,
      propertyKey
    ) as AsyncValidationSpec[] | undefined;
  }

  public static getValidatorsAndErrorMap(
    target: any,
    propertyKey: string
  ): {
    validators: any[];
    errorMap: Map<string, string>;
  } {
    // return Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) as ValidationSpec[] | undefined
    const validatorsAndErrorMap = {
      validators: new Array(),
      errorMap: new Map<string, string>(),
    };
    const validationSpecs = AsyncValidationMeta.get(target, propertyKey);
    if (validationSpecs) {
      validationSpecs.forEach((spec) => {
        validatorsAndErrorMap.validators.push(spec.validator);
        validatorsAndErrorMap.errorMap.set(spec.errorName, spec.errorMessage);
      });
    }
    return validatorsAndErrorMap;
  }
}
