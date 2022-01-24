import { CheckboxMeta } from '../../types/controls-meta/controls-meta';
import { ControlsDescription } from '../../types/controls-meta/controls-description';
import { addMetaData } from './addMetaData';

/**
 * Declares that  field is viewed as check box and makes the proper bindings
 * default width is 12 takes the full row
 *
 * @param controlMeta
 */
export function CheckboxControl(controlMeta: CheckboxMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.checkbox(controlMeta, propertyKey)
    );
  };
}
