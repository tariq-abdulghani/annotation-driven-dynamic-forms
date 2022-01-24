import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function Min(errConfig: { message: string; minValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.validators.push(Validators.min(errConfig.minValue));
    metaData.errorMap.set('min', errConfig.message);
  };
}
