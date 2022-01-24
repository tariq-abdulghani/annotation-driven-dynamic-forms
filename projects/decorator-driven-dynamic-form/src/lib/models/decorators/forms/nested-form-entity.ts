import { ControlTypes } from '../../types/control-types.enum';
import { NestedFormMeta } from '../../types/forms-meta/NestedFormMeta';
import { addMetaData } from '../controls/addMetaData';

export function NestedFormEntity(metaData: NestedFormMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(target, propertyKey, {
      ...metaData,
      controlType: ControlTypes.Composite,
    });
  };
}
