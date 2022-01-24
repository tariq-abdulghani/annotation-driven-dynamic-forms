import { DateControlMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/controls-description';
import { addMetaData } from './addMetaData';

export function DateControl(dateControlMeta: DateControlMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.date(dateControlMeta, propertyKey)
    );
  };
}
