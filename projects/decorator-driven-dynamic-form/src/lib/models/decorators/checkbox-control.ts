import { Descriptors } from '../types/controls-descriptors.ts';
import { CheckboxMeta } from '../types/controls-meta';
import { setMetaData } from './common-controls';

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
