import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import { Validations } from './validations';

export function Pattern(errConfig: { message: string; pattern: RegExp }) {
  return function (target: any, propertyKey: string) {
    // const metaData = MetaDataRegisterer.get<InputDescription>(
    //   target,
    //   propertyKey
    // );
    // metaData.validators.push(Validators.pattern(errConfig.pattern));
    // metaData.errorMap.set('pattern', errConfig.message);
    Validations.addValidationMeta({errorName: 'pattern',errorMessage: errConfig.message, validatorFn: Validators.pattern(errConfig.pattern)}, target, propertyKey)

  };
}
