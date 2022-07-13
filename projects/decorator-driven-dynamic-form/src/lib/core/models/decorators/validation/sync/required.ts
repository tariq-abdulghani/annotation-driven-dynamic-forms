import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function Required(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'required',
        errorMessage: errConfig.message,
        validatorFn: Validators.required,
      },
      target,
      propertyKey
    );
  };
}
