import { ValidatorFn } from '@angular/forms';
import { ValidationSpec } from './validations';

export const VALIDATION_METADATA_KEY = Symbol('ValidationSpec');

export class ValidationsMetaData {
  public static add(
    validationSpec: ValidationSpec,
    target: any,
    propertyKey: string
  ) {
    const validationMeta = Reflect.getMetadata(
      VALIDATION_METADATA_KEY,
      target,
      propertyKey
    ) as ValidationSpec[] | undefined;
    if (validationMeta) {
      validationMeta.push(validationSpec);
    } else {
      Reflect.defineMetadata(
        VALIDATION_METADATA_KEY,
        [validationSpec],
        target,
        propertyKey
      );
    }
  }

  public static get(target: any, propertyKey: string) {
    return Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) as
      | ValidationSpec[]
      | undefined;
  }

  public static getValidatorsAndErrorMap(
    target: any,
    propertyKey: string
  ): { validators: ValidatorFn[]; errorMap: Map<string, string> } {
    // return Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) as ValidationSpec[] | undefined
    const validatorsAndErrorMap = {
      validators: new Array(),
      errorMap: new Map<string, string>(),
    };
    const validationSpecs = ValidationsMetaData.get(target, propertyKey);
    if (validationSpecs) {
      validationSpecs.forEach((spec) => {
        validatorsAndErrorMap.validators.push(spec.validatorFn);
        validatorsAndErrorMap.errorMap.set(spec.errorName, spec.errorMessage);
      });
    }
    return validatorsAndErrorMap;
  }
}
