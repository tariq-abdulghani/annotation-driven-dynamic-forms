import { FormControl, ValidatorFn } from "@angular/forms";
import 'reflect-metadata';

export function formModel(configs: {
    showReset: boolean;
    resetBtnLabel: string;
    submitBtnLabel: string;
  }) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
      return class extends constructor {
          showReset = configs.showReset;
          resetBtnLabel = configs.resetBtnLabel;
          submitBtnLabel = configs.submitBtnLabel;
          formModel = true;
      };
    };
  }

export function textControl(
    textControlMeta: {
        name: string;
        type: string;
        validators: ValidatorFn[];
        width?: number;
        style?: string;
        class?: string;
        [x: string]: any;
      }
){
    return function (target: any, propertyKey: string) {
        textControlMeta.propertyKey = propertyKey;
        textControlMeta['formControl'] = new FormControl();
        
        const setter = function(val?:any){
            textControlMeta.formControl?.setValue(val);
        }
    
        const getter = function(){
            return textControlMeta.formControl?.value;
        }
    
        Object.defineProperty(target, propertyKey, {
          set: setter,
          get: getter,
          enumerable: true
        });
       
        Reflect.defineMetadata(propertyKey, textControlMeta, target, propertyKey);
        console.log("property decorator run");
      }
}