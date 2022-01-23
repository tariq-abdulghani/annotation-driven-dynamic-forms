import { DateControlMeta } from '../../types/controls-meta/controls-meta';
import { Descriptions_dep } from '../../types/controls-meta/Descriptions_dep';
import { setMetaData } from './setMetaData';

export function DateControl(dateControlMeta: DateControlMeta) {
  return function (target: any, propertyKey: string) {
    dateControlMeta.type = 'date';
    // setMetaData(target, propertyKey, dateControlMeta, ControlTypes.Date);
    setMetaData(
      target,
      propertyKey,
      Descriptions_dep.date(dateControlMeta, propertyKey)
    );
  };
}
