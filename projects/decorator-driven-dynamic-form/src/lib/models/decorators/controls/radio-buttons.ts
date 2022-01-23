import { RadioButtonsMeta } from '../../types/controls-meta/controls-meta';
import { Descriptions_dep } from '../../types/controls-meta/Descriptions_dep';
import { setMetaData } from './setMetaData';

export function RadioButtons(radiosMeta: RadioButtonsMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptions_dep.radioButtons(radiosMeta, propertyKey)
    );
  };
}
