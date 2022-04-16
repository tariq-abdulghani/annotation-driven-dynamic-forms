import {
  AsyncValidationMeta,
  AsyncValidationSpec,
} from './async-validation-meta-data';

export function AsyncValidation(specs: AsyncValidationSpec) {
  return function (target: any, propertyKey: string) {
    AsyncValidationMeta.add(specs, target, propertyKey);
  };
}
