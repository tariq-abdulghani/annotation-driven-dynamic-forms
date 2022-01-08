import { FormControl } from '@angular/forms';
import { ControlTypes } from './control-types.enum';
import {
  FormMeta,
  TextControlMeta,
  NumberControlMeta,
  DateControlMeta,
} from './controls-meta';
import 'reflect-metadata';
import { FormLayout } from './form-layout-enum';
import { FormDescriptor, FormEntityProcessor } from './formEntityProcessor';

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

export function TextControl(textControlMeta: TextControlMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(target, propertyKey, textControlMeta, ControlTypes.Text);
  };
}

export function NumberControl(numberControlMeta: NumberControlMeta) {
  return function (target: any, propertyKey: string) {
    numberControlMeta.type = 'number';
    setMetaData(target, propertyKey, numberControlMeta, ControlTypes.Number);
  };
}

export function DateControl(dateControlMeta: DateControlMeta) {
  return function (target: any, propertyKey: string) {
    dateControlMeta.type = 'date';
    setMetaData(target, propertyKey, dateControlMeta, ControlTypes.Date);
  };
}

export function setMetaData(
  target: any,
  propertyKey: string,
  metaData: any,
  controlType: ControlTypes
) {
  // adding other meta data the makes specific details
  //  that are not consistent to be seen at declaration
  // like if you selected a date control it must be of type date control
  // this hidden initialization is to make the api consistent its a bad practice
  // but that side of the tool is supposed to be hidden
  metaData.propertyKey = propertyKey;
  metaData['controlType'] = controlType;
  metaData['formControl'] = new FormControl(null, metaData['validators']);
  metaData['width'] = metaData['width'] || 6;
  const setter = function (val?: any) {
    metaData.formControl?.setValue(val);
  };

  const getter = function () {
    return metaData.formControl?.value;
  };

  Object.defineProperty(target, propertyKey, {
    set: setter,
    get: getter,
    enumerable: true,
  });

  Reflect.defineMetadata(propertyKey, metaData, target, propertyKey);
}

export function NestedFormModel(metaData: {
  name: string;
  classDeclaration: any;
}) {
  return function (target: any, propertyKey: string) {
    const instance = new metaData.classDeclaration();
    //@ts-ignore
    metaData['instance'] = instance;
    const descriptor = FormEntityProcessor.generateFormDescriptor(instance);
    console.log('descriptor nested', descriptor);
    setNestedMetaData(target, propertyKey, metaData, descriptor);
  };
}

export function setNestedMetaData(
  target: any,
  propertyKey: string,
  metaData: any,
  descriptor?: FormDescriptor
) {
  metaData.propertyKey = propertyKey;
  metaData['controlType'] = ControlTypes.Composite;
  metaData['formGroup'] = descriptor?.formGroup;
  metaData['controlsMeta'] = descriptor?.controlsMeta;
  metaData['formLayout'] = descriptor?.formLayout;
  // metaData['width'] = metaData['width'] || 6;
  const setter = function (val?: any) {
    metaData.instance.smartSetter(val);
  };

  const getter = function () {
    return metaData.formGroup?.value;
  };

  Object.defineProperty(target, propertyKey, {
    set: setter,
    get: getter,
    enumerable: true,
  });

  Reflect.defineMetadata(propertyKey, metaData, target, propertyKey);
  console.log('NestedFormModel decorator run', propertyKey);
}
