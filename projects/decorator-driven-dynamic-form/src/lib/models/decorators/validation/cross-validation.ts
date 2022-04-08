import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';
import { CrossValidationMeta } from './CrossValidationMeta';

type Effect = {
  input: string;
  message: string;
};
export type CrossValidationSpec = {
  errorName: string;
  effects: Effect[];
  validatorFn: ValidatorFn;
};

export function CrossValidation(spec: CrossValidationSpec) {
  // return (target) => {
  //   const crossValidationMeta = Reflect.getMetadata(
  //     CROSS_VALIDATION_METADATA_KEY,
  //     target
  //   );
  //   if (!crossValidationMeta) {
  //     return Reflect.defineMetadata(
  //       CROSS_VALIDATION_METADATA_KEY,
  //       [spec],
  //       target
  //     );
  //   } else {
  //     crossValidationMeta.push(spec);
  //   }
  // };

  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    CrossValidationMeta.add(spec, constructor);
    return class extends constructor {};
  };
}
