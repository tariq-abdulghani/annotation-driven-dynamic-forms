import { DateControlMeta } from '../../types/controls-meta/controls-meta';
import { Descriptors } from '../../types/descriptors';
import { setMetaData } from './setMetaData';

export function DateControl(dateControlMeta: DateControlMeta) {
  return function (target: any, propertyKey: string) {
    dateControlMeta.type = 'date';
    // setMetaData(target, propertyKey, dateControlMeta, ControlTypes.Date);
    setMetaData(
      target,
      propertyKey,
      Descriptors.date(dateControlMeta, propertyKey)
    );
  };
}
