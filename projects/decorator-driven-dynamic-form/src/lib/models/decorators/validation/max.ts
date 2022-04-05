import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function Max(errConfig: { message: string; maxValue: number }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'max',
        errorMessage: errConfig.message,
        validatorFn: Validators.max(errConfig.maxValue),
      },
      target,
      propertyKey
    );
  };
}
