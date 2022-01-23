import { DateControlMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/controls-description';
import { Descriptions_dep } from '../../types/controls-meta/Descriptions_dep';
import { addMetaData, convenientSetterAndGetter } from './addMetaData';
import { setMetaData } from './setMetaData';

export function DateControl(dateControlMeta: DateControlMeta) {
  return function (target: any, propertyKey: string) {
    convenientSetterAndGetter(target, propertyKey);
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.date(dateControlMeta, propertyKey)
    );
  };
}
