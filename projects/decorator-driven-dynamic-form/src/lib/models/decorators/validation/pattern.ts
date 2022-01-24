import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function Pattern(errConfig: { message: string; pattern: RegExp }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.validators.push(Validators.pattern(errConfig.pattern));
    metaData.errorMap.set('pattern', errConfig.message);
  };
}
