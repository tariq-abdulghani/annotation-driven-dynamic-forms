import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function Max(errConfig: { message: string; maxValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.max(errConfig.maxValue)]);
    metaData.errorMap.set('max', errConfig.message);
  };
}
