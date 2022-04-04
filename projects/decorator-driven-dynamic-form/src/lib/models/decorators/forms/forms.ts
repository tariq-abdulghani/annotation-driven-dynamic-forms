import { MapUtil } from '../../../utils/map-util';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';
import {
  FormMeta,
  FormSpec,
  NestedFormMeta,
  NestedFormSpec,
} from '../../types/forms/form-meta';
export const FORM_METADATA_KEY = Symbol('FormSpec'); 

export function FormEntity(formSpec?: FormSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    FormMetaData.add(formSpec, constructor);
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

export class FormMetaData{
  public static add(formSpec: FormSpec|undefined, constructor: any){
    Reflect.defineMetadata(FORM_METADATA_KEY, MapUtil.formObject(new FormMeta(formSpec)), constructor.prototype);
  }

  public static get(target: any){
    // console.log(target);
    return Reflect.getMetadata(FORM_METADATA_KEY, target) as Map<string, any>;
  }
  

} 

