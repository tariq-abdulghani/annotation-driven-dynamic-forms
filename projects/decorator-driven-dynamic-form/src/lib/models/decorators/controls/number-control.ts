import { NumberControlMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/controls-description';
import { addMetaData } from './addMetaData';

export function NumberControl(numberControlMeta: NumberControlMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.number(numberControlMeta, propertyKey)
    );
  };
}
