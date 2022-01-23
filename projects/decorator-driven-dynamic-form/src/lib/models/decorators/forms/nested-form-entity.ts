import { FormEntityProcessor } from '../../../utils/form-entity-processor';
import { NestedFormDescription } from '../../types/forms-meta/NestedFormDescription';
import { NestedFormMeta } from '../../types/forms-meta/NestedFormMeta';

export function NestedFormEntity(metaData: NestedFormMeta) {
  return function (target: any, propertyKey: string) {
    const instance = new metaData.classDeclaration();
    const nestedFormDescriptor = new NestedFormDescription();
    const descriptor = FormEntityProcessor.generateFormDescription(instance);
    nestedFormDescriptor.instance = instance;
    nestedFormDescriptor.name = metaData.name;
    nestedFormDescriptor.propertyKey = propertyKey;
    nestedFormDescriptor.formGroup = descriptor.formGroup;
    nestedFormDescriptor.controlsDescriptions = descriptor.controlsDescriptions;
    nestedFormDescriptor.formLayout = descriptor.formLayout;
    setNestedMetaData(target, propertyKey, nestedFormDescriptor);
  };
}

export function setNestedMetaData(
  target: any,
  propertyKey: string,
  metaData: NestedFormDescription
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
