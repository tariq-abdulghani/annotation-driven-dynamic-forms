import { FormMeta } from '../types/controls-meta';
import { FormLayout } from '../types/form-layout-enum';

export function FormModel(formMeta?: FormMeta) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      formLayout =
        formMeta && formMeta.formLayout ? formMeta.formLayout : FormLayout.GRID;
      submit = { label: 'submit', class: 'btn btn-primary' };
      smartSetter = (value: any) => {
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

      isGrid = () => {
        return this.formLayout == FormLayout.GRID;
      };
      // smartGetter = ()=>{
      //   return
      // }
    };
  };
}
