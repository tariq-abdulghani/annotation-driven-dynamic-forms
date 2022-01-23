import { SelectControlMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/descriptions';
import { convenientSetterAndGetter, addMetaData } from './addMetaData';

export function SelectControl(metaData: SelectControlMeta) {
  return function (target: any, propertyKey: string) {
    convenientSetterAndGetter(target, propertyKey);
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.select(metaData, propertyKey)
    );
  };
}
