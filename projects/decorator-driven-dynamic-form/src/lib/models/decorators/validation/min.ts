import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function Min(errConfig: { message: string; minValue: number }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // metaData.validators.push(Validators.min(errConfig.minValue));
    // metaData.errorMap.set('min', errConfig.message);
    Validations.addValidationMeta({errorName: 'min',errorMessage: errConfig.message, validatorFn: Validators.min(errConfig.minValue)}, target, propertyKey)

  };
}
