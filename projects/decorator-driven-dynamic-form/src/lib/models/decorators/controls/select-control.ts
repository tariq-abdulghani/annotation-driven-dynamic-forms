import { setMetaData } from './setMetaData';
import { ControlTypes } from '../../types/control-types.enum';
import { SelectControlMeta } from '../../types/controls-meta/controls-meta';
import { SelectControlDescription } from '../../types/controls-meta/select-control-description';
import { Descriptions_dep } from '../../types/controls-meta/Descriptions_dep';

export function SelectControl(metaData: SelectControlMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptions_dep.select(metaData, propertyKey)
    );
  };
}
