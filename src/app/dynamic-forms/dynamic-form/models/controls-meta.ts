import { FormControl, MinValidator, ValidatorFn, Validators } from "@angular/forms";
import 'reflect-metadata';
import { ControlTypes } from "./control-types.enum";
/*

labels
place holders

*/
export interface DateControlMeta{
  name: string;
  validators: ValidatorFn[];
  minDate?: number,
  maxDate?: number,
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}

export function formModel(configs: {
    showReset?: boolean;
    resetBtnLabel?: string;
    submitBtnLabel?: string;
    formLayout?: string;
  }) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
      return class extends constructor {
          showReset = configs.showReset || false;
          resetBtnLabel = configs.resetBtnLabel || "reset";
          submitBtnLabel = configs.submitBtnLabel || "submit";
          formLayout = configs.formLayout? configs.formLayout: "default"};
    };
  }

export function textControl(textControlMeta: {
  name: string;
  type: string;
  validators: ValidatorFn[];
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}) {
  return function (target: any, propertyKey: string) {
    setMetaData(target, propertyKey, textControlMeta, ControlTypes.Text);
  }
}

export function numberControl(numberControlMeta: {
  name: string;
  validators: ValidatorFn[];
  min?: number,
  max?: number,
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}) {
  return function (target: any, propertyKey: string) {
    numberControlMeta.type = 'number';
    setMetaData(target, propertyKey, numberControlMeta, ControlTypes.Number);
  }
}

export function dateControl(dateControlMeta:DateControlMeta) {
  return function (target: any, propertyKey: string) {
    dateControlMeta.type = 'date'
    setMetaData(target, propertyKey, dateControlMeta, ControlTypes.Date);
  }
}


function setMetaData(target: any, propertyKey: string, metaData: any, controlType: ControlTypes) {
  metaData.propertyKey = propertyKey;
  metaData['controlType'] = controlType;
  metaData['formControl'] = new FormControl();

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
  console.log('property decorator run');
}

