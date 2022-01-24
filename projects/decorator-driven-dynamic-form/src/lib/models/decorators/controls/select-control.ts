import { SelectControlMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/controls-description';
import { addMetaData } from './addMetaData';

export function SelectControl(metaData: SelectControlMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.select(metaData, propertyKey)
    );
  };
}
