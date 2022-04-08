import { Validators } from '@angular/forms';
import { ValidationsMetaData } from './ValidationsMetaData';

export function Pattern(errConfig: { message: string; pattern: RegExp }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'pattern',
        errorMessage: errConfig.message,
        validatorFn: Validators.pattern(errConfig.pattern),
      },
      target,
      propertyKey
    );
  };
}
