import { FormControl } from '@angular/forms';
import 'reflect-metadata';

export function Control(meta: {
  name: string;
  type: string;
  validator: any;
  width?: number;
  style?: string;
  class?: string;
  formControl?: FormControl;
  [x: string]: any;
}): any {
  return function (target: any, propertyKey: string) {
    meta.propertyKey = propertyKey;
    meta.formControl = new FormControl();
    
    const setter = function(val?:any){
        console.log(meta.formControl);
        meta.formControl?.setValue(val);
    }

    const getter = function(){
        return meta.formControl?.value;
    }

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
      enumerable: true
    });
   
    Reflect.defineMetadata(propertyKey, meta, target, propertyKey);
    // console.log("target",target);
  };
}
