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

export type NestedFormDescriptor = {
    controlsMeta: ControlMeta[];
    formGroup: FormGroup;
}

export class FormEntityProcessor{

    /**
     * Generates Form Discriptor an object that contains metata data in a structured way
     * 
     * @param formEntity instance of Calss annotated with '@FormModel'
     * @returns 
     */
    public static generateFormDescriptor(formEntity: any):FormDescriptor{
        console.warn("only two levels are supported in this functions if more levels are needed please implement that");
        const obj = {controlsMeta:[]} as {[x:string] : any}; // formDescriptor empty object
        const formGroupInitializer = {}as {[x:string] : any}; // form group initializer key string control name value FormControl

        // getting fields and set them in the descriptor
        Object.entries(formEntity).forEach(keyValue =>{
            obj[keyValue[0]] = keyValue[1];
        });

        // scans all enumerated fileds including property setters and getters
        for (const key in formEntity) {
            const metaData = Reflect.getMetadata(key, formEntity, key);

            if(metaData && metaData.controlType != ControlTypes.Composite){
                obj.controlsMeta.push(metaData);
                formGroupInitializer[metaData.name] = metaData.formControl;
            }

            if(metaData && metaData.controlType == ControlTypes.Composite){
                obj.controlsMeta.push(metaData);
                formGroupInitializer[metaData.name] = metaData.formGroup;
            }
        }
        obj.formGroup = new FormGroup(formGroupInitializer);
        //@ts-ignore
    return obj;
    }
}
