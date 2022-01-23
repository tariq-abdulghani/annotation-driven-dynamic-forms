import { RadioButtonsMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/descriptions';
import { addMetaData, convenientSetterAndGetter } from './addMetaData';

export function RadioButtons(radiosMeta: RadioButtonsMeta) {
  return function (target: any, propertyKey: string) {
    convenientSetterAndGetter(target, propertyKey);
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.radioButtons(radiosMeta, propertyKey)
    );
  };
}
