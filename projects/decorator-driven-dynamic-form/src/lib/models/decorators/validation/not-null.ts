import { Validators } from '@angular/forms';
import { InputDescription } from '../../types/inputs-meta/input-description';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

export function NotNull(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = MetaDataRegisterer.get<InputDescription<any>>(
      target,
      propertyKey
    );
    // metaData.formControl.addValidators([Validators.required]);
    metaData.validators.push(Validators.required);
    metaData.errorMap.set('required', errConfig.message);
    metaData.meta.required = true;
  };
}
