import { TextControlMeta } from '../../types/controls-meta/controls-meta';
import 'reflect-metadata';
import { convenientSetterAndGetter, addMetaData } from './addMetaData';
import { ControlsDescription } from '../../types/controls-meta/descriptions';

export function TextControl(textControlMeta: TextControlMeta) {
  return function (target: any, propertyKey: string) {
    convenientSetterAndGetter(target, propertyKey);
    addMetaData(
      target,
      propertyKey,
      ControlsDescription.text(textControlMeta, propertyKey)
    );
  };
}
