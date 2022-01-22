import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function MinLength(errConfig: { message: string; minlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([
      Validators.minLength(errConfig.minlength),
    ]);
    metaData.errorMap.set('minlength', errConfig.message);
  };
}
