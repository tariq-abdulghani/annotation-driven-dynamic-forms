import { Validators } from '@angular/forms';
import {
  ControlDescriptor,
  InitializedControlDescriptor,
} from '../../types/descriptors';

export function NotNull(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    // metaData.formControl.addValidators([Validators.required]);
    metaData.validators.push(Validators.required);
    metaData.errorMap.set('required', errConfig.message);
    metaData.required = true;
  };
}

export function Min(errConfig: { message: string; minValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.min(errConfig.minValue)]);
    metaData.errorMap.set('min', errConfig.message);
  };
}

export function Max(errConfig: { message: string; maxValue: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.max(errConfig.maxValue)]);
    metaData.errorMap.set('max', errConfig.message);
  };
}

export function MaxLength(errConfig: { message: string; maxlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([
      Validators.maxLength(errConfig.maxlength),
    ]);
    metaData.errorMap.set('maxlength', errConfig.message);
  };
}

export function MinLength(errConfig: { message: string; minlength: number }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([
      Validators.minLength(errConfig.minlength),
    ]);
    metaData.errorMap.set('minlength', errConfig.message);
  };
}

export function Pattern(errConfig: { message: string; pattern: RegExp }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.pattern(errConfig.pattern)]);
    metaData.errorMap.set('pattern', errConfig.message);
  };
}

export function Email(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.email]);
    metaData.errorMap.set('email', errConfig.message);
  };
}

export function RequiredTrue(errConfig: { message: string }) {
  return function (target: any, propertyKey: string) {
    const metaData = initialMetaCheck(target, propertyKey);
    metaData.formControl.addValidators([Validators.requiredTrue]);
    metaData.errorMap.set('required', errConfig.message);
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

  if (!metaData.validators) {
    metaData.validators = [];
  }
  return metaData as InitializedControlDescriptor;
}
