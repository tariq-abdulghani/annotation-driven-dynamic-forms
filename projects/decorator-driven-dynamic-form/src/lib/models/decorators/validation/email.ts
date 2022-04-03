import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function Email(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // metaData.validators.push(Validators.email);
    // metaData.errorMap.set('email', errConfig.message);
    Validations.addValidationMeta({ errorName: "email", errorMessage: errConfig.message, validatorFn: Validators.email }, target, propertyKey)
  };
}
