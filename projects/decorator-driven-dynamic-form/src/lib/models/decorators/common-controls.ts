import { FormControl } from '@angular/forms';
import { ControlTypes } from '../types/control-types.enum';
import {
  TextControlMeta,
  NumberControlMeta,
  DateControlMeta,
} from '../types/controls-meta';
import 'reflect-metadata';
import { ControlDescriptor, Descriptors } from '../types/descriptors';

export function TextControl(textControlMeta: TextControlMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptors.text(textControlMeta, propertyKey)
    );
  };
}

export function NumberControl(numberControlMeta: NumberControlMeta) {
  return function (target: any, propertyKey: string) {
    setMetaData(
      target,
      propertyKey,
      Descriptors.number(numberControlMeta, propertyKey)
    );
  };
}

export function DateControl(dateControlMeta: DateControlMeta) {
  return function (target: any, propertyKey: string) {
    dateControlMeta.type = 'date';
    // setMetaData(target, propertyKey, dateControlMeta, ControlTypes.Date);
    setMetaData(
      target,
      propertyKey,
      Descriptors.date(dateControlMeta, propertyKey)
    );
  };
}

export function setMetaData(
  target: any,
  propertyKey: string,
  metaData: ControlDescriptor
) {
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

// export function setMetaData(
//   target: any,
//   propertyKey: string,
//   metaData: any,
//   controlType: ControlTypes
// ) {
//   // adding other meta data the makes specific details
//   //  that are not consistent to be seen at declaration
//   // like if you selected a date control it must be of type date control
//   // this hidden initialization is to make the api consistent its a bad practice
//   // but that side of the tool is supposed to be hidden
//   metaData.propertyKey = propertyKey;
//   metaData['controlType'] = controlType;
//   metaData['formControl'] = new FormControl(null, metaData['validators']);
//   metaData['width'] = metaData['width'] || 6;
//   const setter = function (val?: any) {
//     metaData.formControl?.setValue(val);
//   };

//   const getter = function () {
//     return metaData.formControl?.value;
//   };

//   Object.defineProperty(target, propertyKey, {
//     set: setter,
//     get: getter,
//     enumerable: true,
//   });

//   Reflect.defineMetadata(propertyKey, metaData, target, propertyKey);
// }
