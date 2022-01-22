import { TextControlMeta } from '../../types/controls-meta/controls-meta';
import 'reflect-metadata';
import { Descriptors } from '../../types/descriptors';
import { convenientSetterAndGetter, addMetaData } from './addMetaData';

export function TextControl(textControlMeta: TextControlMeta) {
  return function (target: any, propertyKey: string) {
    convenientSetterAndGetter(target, propertyKey);
    addMetaData(
      target,
      propertyKey,
      Descriptors.text(textControlMeta, propertyKey)
    );
  };
}
