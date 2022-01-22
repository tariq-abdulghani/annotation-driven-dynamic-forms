export function addMetaData(target: any, propertyKey: string, metaData: any) {
  Reflect.defineMetadata(propertyKey, metaData, target, propertyKey);
}

export function convenientSetterAndGetter(target: any, propertyKey: string) {
  let value: any = null;
  const setter = function (val?: any) {
    value = val;
  };

  const getter = function () {
    value;
  };

  Object.defineProperty(target, propertyKey, {
    set: setter,
    get: getter,
    enumerable: true,
  });
}
