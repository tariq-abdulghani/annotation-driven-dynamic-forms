import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function MinLength(errConfig: { message: string; minlength: number }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'minlength',
        errorMessage: errConfig.message,
        validatorFn: Validators.minLength(errConfig.minlength),
      },
      target,
      propertyKey
    );
  };
}
