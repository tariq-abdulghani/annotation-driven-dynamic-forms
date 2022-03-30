import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import {
  FormMeta,
  FormSpec,
  NestedFormMeta,
  NestedFormSpec,
} from '../../types/forms/form-meta';

export function FormEntity(formSpec?: FormSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      meta = new FormMeta(formSpec);
      valueSetter = (value: any) => {
        console.warn('implement smart setter for null value');
        if (value == null) {
        }
        if (value instanceof Object) {
          for (const key in this) {
            if (value[key] != undefined) {
              //@ts-ignore
              this[key] = value[key];
            }
          }
        }
      };
    };
  };
}

export function NestedFormEntity(formSpec: NestedFormSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(target, propertyKey, new NestedFormMeta(formSpec));
  };
}
