import { NumberControlMeta } from '../../types/controls-meta/controls-meta';
import { Descriptors } from '../../types/descriptors';
import { convenientSetterAndGetter, addMetaData } from './addMetaData';

export function NumberControl(numberControlMeta: NumberControlMeta) {
  return function (target: any, propertyKey: string) {
    convenientSetterAndGetter(target, propertyKey);
    addMetaData(
      target,
      propertyKey,
      Descriptors.number(numberControlMeta, propertyKey)
    );
  };
}
