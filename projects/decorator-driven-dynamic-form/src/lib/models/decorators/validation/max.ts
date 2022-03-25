import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs-meta/input-description';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

export function Max(errConfig: { message: string; maxValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = MetaDataRegisterer.get<InputDescription<any>>(
      target,
      propertyKey
    );
    metaData.validators.push(Validators.max(errConfig.maxValue));
    metaData.errorMap.set('max', errConfig.message);
  };
}
