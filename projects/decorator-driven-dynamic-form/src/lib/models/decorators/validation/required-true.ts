import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs-meta/input-description';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

export function RequiredTrue(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = MetaDataRegisterer.get<InputDescription<any>>(
      target,
      propertyKey
    );
    metaData.validators.push(Validators.requiredTrue);
    metaData.errorMap.set('required', errConfig.message);
  };
}
