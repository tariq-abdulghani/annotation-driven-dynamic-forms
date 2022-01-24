import { RadioButtonsMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/controls-description';
import { addMetaData } from './addMetaData';

export function RadioButtons(radiosMeta: RadioButtonsMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.radioButtons(radiosMeta, propertyKey)
    );
  };
}
