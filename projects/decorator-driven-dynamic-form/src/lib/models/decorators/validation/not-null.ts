import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function NotNull(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // // metaData.formControl.addValidators([Validators.required]);
    // metaData.validators.push(Validators.required);
    // metaData.errorMap.set('required', errConfig.message);
    // metaData.metaData.add('required', true);
    Validations.addValidationMeta({errorName:'required',errorMessage: errConfig.message, validatorFn: Validators.required}, target, propertyKey)

  };
}
