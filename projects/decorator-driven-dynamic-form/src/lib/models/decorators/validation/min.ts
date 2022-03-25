import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs-meta/input-description';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

export function Min(errConfig: { message: string; minValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = MetaDataRegisterer.get<InputDescription<any>>(
      target,
      propertyKey
    );
    metaData.validators.push(Validators.min(errConfig.minValue));
    metaData.errorMap.set('min', errConfig.message);
  };
}
