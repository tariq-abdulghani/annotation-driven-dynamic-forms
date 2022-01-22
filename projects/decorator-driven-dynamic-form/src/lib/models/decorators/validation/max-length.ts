import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function MaxLength(errConfig: { message: string; maxlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([
      Validators.maxLength(errConfig.maxlength),
    ]);
    metaData.errorMap.set('maxlength', errConfig.message);
  };
}
