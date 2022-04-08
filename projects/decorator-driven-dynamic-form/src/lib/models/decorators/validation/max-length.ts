import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function MaxLength(errConfig: { message: string; maxlength: number }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'maxlength',
        errorMessage: errConfig.message,
        validatorFn: Validators.maxLength(errConfig.maxlength),
      },
      target,
      propertyKey
    );
  };
}
