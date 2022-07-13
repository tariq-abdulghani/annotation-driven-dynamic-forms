import { FormMeta, FormSpec } from '../../types/forms/form-meta';
import { FormMetaData } from './Form-meta-data';

export function FormEntity(formSpec: FormSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    FormMetaData.add(formSpec, constructor);
    return class extends constructor {
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
