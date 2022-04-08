import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function Email(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'email',
        errorMessage: errConfig.message,
        validatorFn: Validators.email,
      },
      target,
      propertyKey
    );
  };
}
