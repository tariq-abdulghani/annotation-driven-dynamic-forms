import { FormDescriptor } from '../types/descriptors';

/**
 * Enables using objects to update form so no need to create new form model
 * or use the ugly way Java POJOS are updated smart setter takes every key
 * and use the proper setter to set it so a set of cascade set operations occur
 *
 */
export function FormModelSmartSetter(target: any, propertyKey: string) {
  let value: FormDescriptor | null = null;

  const setter = function (val?: any) {
    console.log(val);
    if (value != null) {
      value.smartSetter(val);
    } else {
      value = val;
    }
  };

  const getter = function () {
    return value;
  };

  Object.defineProperty(target, propertyKey, {
    set: setter,
    get: getter,
    enumerable: true,
  });

  console.log('form smart setter', target, target[propertyKey], propertyKey);
}
