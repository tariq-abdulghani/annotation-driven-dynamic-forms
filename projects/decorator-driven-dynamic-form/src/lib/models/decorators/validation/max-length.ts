import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function MaxLength(errConfig: { message: string; maxlength: number }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // metaData.validators.push(Validators.maxlength(errConfig.maxlength));
    // metaData.errorMap.set('maxlength', errConfig.message);
    Validations.addValidationMeta({errorName: 'maxlength',errorMessage: errConfig.message, validatorFn: Validators.maxLength(errConfig.maxlength)}, target, propertyKey)
  };
}
