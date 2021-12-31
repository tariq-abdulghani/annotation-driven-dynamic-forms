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

export function FormModel(formMeta: FormMeta) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      showReset = formMeta.showReset || false;
      resetBtnLabel = formMeta.resetBtnLabel || 'reset';
      submitBtnLabel = formMeta.submitBtnLabel || 'submit';
      formLayout = formMeta.formLayout ? formMeta.formLayout : FormLayout.GRID;
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
  console.log('property decorator run', propertyKey);
}
