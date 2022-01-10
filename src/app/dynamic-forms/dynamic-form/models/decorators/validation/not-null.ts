import { Validators } from '@angular/forms';
import { ControlDescriptor } from '../../types/controls-descriptors.ts';

export function NotNull(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData: ControlDescriptor = Reflect.getMetadata(
      propertyKey,
      target,
      propertyKey
    );
    if (!metaData) {
      throw new Error(
        'validators should declared after using control annotation'
      );
    }
    if (!metaData.errorMap) {
      metaData.errorMap = new Map<string, string>();
    }

    metaData.formControl.addValidators([Validators.required]);
    metaData.errorMap.set('required', errConfig.message);
    console.log('not null is called', metaData, errConfig);
  };
}
