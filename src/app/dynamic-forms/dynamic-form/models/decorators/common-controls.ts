import { FormControl } from '@angular/forms';
import { ControlTypes } from '../types/control-types.enum';
import {
  TextControlMeta,
  NumberControlMeta,
  DateControlMeta,
  NestedFormMeta,
} from '../types/controls-meta';
import 'reflect-metadata';
import { FormEntityProcessor } from '../../utils/formEntityProcessor';
import { NestedFormDescriptor } from '../types/controls-descriptors.ts';

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

export function NestedFormModel(metaData: NestedFormMeta) {
  return function (target: any, propertyKey: string) {
    const instance = new metaData.classDeclaration();
    const nestedFormDescriptor = new NestedFormDescriptor();
    const descriptor = FormEntityProcessor.generateFormDescriptor(instance);
    nestedFormDescriptor.instance = instance;
    nestedFormDescriptor.name = metaData.name;
    nestedFormDescriptor.propertyKey = propertyKey;
    nestedFormDescriptor.formGroup = descriptor.formGroup;
    nestedFormDescriptor.controlsDescriptor = descriptor.controlsDescriptor;
    nestedFormDescriptor.formLayout = descriptor.formLayout;
    setNestedMetaData(target, propertyKey, nestedFormDescriptor);
  };
}

export function setNestedMetaData(
  target: any,
  propertyKey: string,
  metaData: NestedFormDescriptor
) {
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
