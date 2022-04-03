import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function Max(errConfig: { message: string; maxValue: number }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // metaData.validators.push(Validators.max(errConfig.maxValue));
    // metaData.errorMap.set('max', errConfig.message);
    Validations.addValidationMeta({errorName: 'max',errorMessage: errConfig.message, validatorFn: Validators.max(errConfig.maxValue)}, target, propertyKey)

  };
}
