import { ControlDescriptor } from '../../types/descriptors';

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
