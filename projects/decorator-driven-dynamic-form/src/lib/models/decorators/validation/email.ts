import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function Email(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.email]);
    metaData.errorMap.set('email', errConfig.message);
  };
}
