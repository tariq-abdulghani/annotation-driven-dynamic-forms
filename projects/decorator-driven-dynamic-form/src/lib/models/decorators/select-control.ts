import { setMetaData } from './common-controls';
import { ControlTypes } from '../types/control-types.enum';
import { SelectControlMeta } from '../types/controls-meta';
import {
  Descriptors,
  SelectControlDescriptor,
} from '../types/controls-descriptors.ts';

export function SelectControl(metaData: SelectControlMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(target, propertyKey, Descriptors.select(metaData, propertyKey));
  };
}
