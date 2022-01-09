import { FormMeta } from '../types/controls-meta';
import { FormLayout } from '../types/form-layout-enum';

export function FormModel(formMeta: FormMeta) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      showReset = formMeta.showReset || false;
      resetBtnLabel = formMeta.resetBtnLabel || 'reset';
      submitBtnLabel = formMeta.submitBtnLabel || 'submit';
      formLayout = formMeta.formLayout ? formMeta.formLayout : FormLayout.GRID;

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
      // smartGetter = ()=>{
      //   return
      // }
    };
  };
}
