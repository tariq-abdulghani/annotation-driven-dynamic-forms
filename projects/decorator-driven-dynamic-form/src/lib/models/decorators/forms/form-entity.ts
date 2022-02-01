import { FormMeta } from '../../types/forms-meta/FormMeta';
import { FormLayout } from '../../types/form-layout-enum';
import { ControlTypes } from '../../types/control-types.enum';

export function FormEntity(formMeta?: FormMeta) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      formLayout =
        formMeta && formMeta.layout ? formMeta.layout : FormLayout.GRID;
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
