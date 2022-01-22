import {
  ControlDescriptor,
  InitializedControlDescriptor,
} from '../../types/descriptors';

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
