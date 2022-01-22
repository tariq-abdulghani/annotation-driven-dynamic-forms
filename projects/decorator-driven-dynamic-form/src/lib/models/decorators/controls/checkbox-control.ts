import { CheckboxMeta } from '../../types/controls-meta/controls-meta';
import { Descriptors } from '../../types/descriptors';
import { setMetaData } from './setMetaData';

/**
 * Declares that  field is viewed as check box and makes the proper bindings
 * default width is 12 takes the full row
 *
 * @param controlMeta
 */
export function CheckboxControl(controlMeta: CheckboxMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptors.checkbox(controlMeta, propertyKey)
    );
  };
}
