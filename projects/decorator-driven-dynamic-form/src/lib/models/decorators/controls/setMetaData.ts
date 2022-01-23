import { ControlDescription } from '../../types/controls-meta/control-description';

export function setMetaData(
  target: any,
  propertyKey: string,
  metaData: ControlDescription
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
