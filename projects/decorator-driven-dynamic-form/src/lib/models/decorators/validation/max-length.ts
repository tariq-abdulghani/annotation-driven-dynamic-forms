import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs-meta/input-description';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

export function MaxLength(errConfig: { message: string; maxlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = MetaDataRegisterer.get<InputDescription<any>>(
      target,
      propertyKey
    );
    metaData.validators.push(Validators.maxLength(errConfig.maxlength));
    metaData.errorMap.set('maxlength', errConfig.message);
  };
}
