import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs/input-description';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';

export function RequiredTrue(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = MetaDataRegisterer.get<InputDescription>(
      target,
      propertyKey
    );
    metaData.validators.push(Validators.requiredTrue);
    metaData.errorMap.set('required', errConfig.message);
  };
}
