import { setMetaData } from './setMetaData';
import { ControlTypes } from '../../types/control-types.enum';
import { SelectControlMeta } from '../../types/controls-meta/controls-meta';
import { Descriptors, SelectControlDescriptor } from '../../types/descriptors';

export function SelectControl(metaData: SelectControlMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(target, propertyKey, Descriptors.select(metaData, propertyKey));
  };
}
