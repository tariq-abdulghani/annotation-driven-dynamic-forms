import { Descriptors } from '../types/controls-descriptors.ts';
import { RadioButtonsMeta } from '../types/controls-meta';
import { setMetaData } from './common-controls';

export function RadioButtons(radiosMeta: RadioButtonsMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptors.radioButtons(radiosMeta, propertyKey)
    );
  };
}
