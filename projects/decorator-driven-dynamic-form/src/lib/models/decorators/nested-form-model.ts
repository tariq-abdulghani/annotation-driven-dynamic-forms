import { FormEntityProcessor } from '../../utils/form-entity-processor';
import { NestedFormDescriptor } from '../types/descriptors';
import { NestedFormMeta } from '../types/controls-meta';

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
  // console.log('NestedFormModel decorator run', propertyKey);
}
