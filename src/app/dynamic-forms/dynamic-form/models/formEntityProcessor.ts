import { FormControl, FormGroup } from "@angular/forms";
import { ControlTypes } from "./control-types.enum";

export type ControlMeta = {
  name: string;
  controlType: ControlTypes;
  width?: number;
  style?: string;
  class?: string;
  formControl: FormControl;
  [x: string]: any;
};

export type FormDescriptor = {
  showReset: boolean;
  resetBtnLabel: string;
  submitBtnLabel: string;
  formLayout?: string;
  controlsMeta: ControlMeta[];
  formGroup: FormGroup;
};

export class FormEntityProcessor{

    public static generateFormDescriptor(formEntity: any):FormDescriptor{
        const obj = {controlsMeta:[]} as {[x:string] : any};
        const formGroupInitializer = {}as {[x:string] : any};

        Object.entries(formEntity).forEach(keyValue =>{
            obj[keyValue[0]] = keyValue[1];
        });

        for (const key in formEntity) {
            const metaData = Reflect.getMetadata(key, formEntity, key);
            if(metaData){
                obj.controlsMeta.push(metaData);
                formGroupInitializer[metaData.name] = metaData.formControl;
            }
        }
        // console.log(formGroupInitializer);
        obj.formGroup = new FormGroup(formGroupInitializer);
        // obj.formGroup.valueChanges.subscribe((v: any) => console.log(v));
        //@ts-ignore
    return obj;
    }

    // public static generateFormDescriptor(formEntity: any):{[x:string]: any, controlsMeta: any[]}{
    //     const obj = {controlsMeta:[]} as {[x: string]: any, controlsMeta: any[]};
        
    //     Object.entries(formEntity).forEach(keyValue =>{
    //         obj[keyValue[0]] = keyValue[1];
    //     });

    //     for (const key in formEntity) {
    //         const metaData = Reflect.getMetadata(key, formEntity, key);
    //         if(metaData){
    //             obj.controlsMeta.push(metaData)
    //         }
    //     }
    // return obj;
    // }
}
