import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function MinLength(errConfig: { message: string; minlength: number }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // metaData.validators.push(Validators.minLength(errConfig.minlength));
    // metaData.errorMap.set('minlength', errConfig.message);
    Validations.addValidationMeta({errorName: 'minlength',errorMessage: errConfig.message, validatorFn: Validators.minLength(errConfig.minlength)}, target, propertyKey)

  };
}
