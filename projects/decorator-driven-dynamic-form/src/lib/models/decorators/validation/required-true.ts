import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function RequiredTrue(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.requiredTrue]);
    metaData.errorMap.set('required', errConfig.message);
  };
}
