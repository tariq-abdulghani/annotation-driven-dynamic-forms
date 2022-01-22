import { RadioButtonsMeta } from '../../types/controls-meta/controls-meta';
import { Descriptors } from '../../types/descriptors';
import { setMetaData } from './setMetaData';

export function RadioButtons(radiosMeta: RadioButtonsMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptors.radioButtons(radiosMeta, propertyKey)
    );
  };
}
