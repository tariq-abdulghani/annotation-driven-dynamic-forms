import { Validators } from '@angular/forms';
import {
  ControlDescriptor,
  InitializedControlDescriptor,
} from '../../types/controls-descriptors.ts';

export function NotNull(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.required]);
    metaData.errorMap.set('required', errConfig.message);
    metaData.required = true;
    // console.log('not null is called', metaData, errConfig);
  };
}

export function Min(errConfig: { message: string; minValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.min(errConfig.minValue)]);
    metaData.errorMap.set('min', errConfig.message);
    // console.log('min is called', metaData, errConfig);
  };
}

export function Max(errConfig: { message: string; maxValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.max(errConfig.maxValue)]);
    metaData.errorMap.set('max', errConfig.message);
    // metaData.formControl.updateValueAndValidity();
    // console.log('max is called', metaData, errConfig);
  };
}

export function MaxLength(errConfig: { message: string; maxlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([
      Validators.maxLength(errConfig.maxlength),
    ]);
    metaData.errorMap.set('maxlength', errConfig.message);
    // metaData.formControl.updateValueAndValidity();
    // console.log('maxLength is called', metaData, errConfig);
  };
}

export function MinLength(errConfig: { message: string; minlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([
      Validators.minLength(errConfig.minlength),
    ]);
    metaData.errorMap.set('minlength', errConfig.message);
    // metaData.formControl.updateValueAndValidity();
    // console.log('minlength is called', metaData, errConfig);
  };
}

export function Pattern(errConfig: { message: string; pattern: RegExp }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.pattern(errConfig.pattern)]);
    metaData.errorMap.set('pattern', errConfig.message);
    // metaData.formControl.updateValueAndValidity();
    // console.log('pattern is called', metaData, errConfig);
  };
}

export function initialMetaCheck(
  target: any,
  propertyKey: string
): InitializedControlDescriptor {
  const metaData: ControlDescriptor = Reflect.getMetadata(
    propertyKey,
    target,
    propertyKey
  );
  if (!metaData) {
    throw new Error(
      'validators should declared after using control annotation'
    );
  }
  if (!metaData.errorMap) {
    metaData.errorMap = new Map<string, string>();
  }
  return metaData as InitializedControlDescriptor;
}
