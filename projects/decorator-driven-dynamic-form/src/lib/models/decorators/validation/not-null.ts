import { Validators } from '@angular/forms';
import { initialMetaCheck } from './initial-meta-check';

export function NotNull(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    // metaData.formControl.addValidators([Validators.required]);
    metaData.validators.push(Validators.required);
    metaData.errorMap.set('required', errConfig.message);
    metaData.required = true;
  };
}
