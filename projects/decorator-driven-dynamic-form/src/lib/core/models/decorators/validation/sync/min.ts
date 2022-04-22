import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function Min(errConfig: { message: string; minValue: number }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'min',
        errorMessage: errConfig.message,
        validatorFn: Validators.min(errConfig.minValue),
      },
      target,
      propertyKey
    );
  };
}
