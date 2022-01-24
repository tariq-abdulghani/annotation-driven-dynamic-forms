import { TextControlMeta } from '../../types/controls-meta/controls-meta';
import { addMetaData } from './addMetaData';
import { ControlsDescription } from '../../types/controls-meta/controls-description';

export function TextControl(textControlMeta: TextControlMeta) {
  return function (target: any, propertyKey: string) {
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.text(textControlMeta, propertyKey)
    );
  };
}
