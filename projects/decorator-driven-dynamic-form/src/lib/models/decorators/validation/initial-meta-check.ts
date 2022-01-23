import { InitializedControlDescription } from '../../types/controls-meta/initialized-control-description';
import { ControlDescription } from '../../types/controls-meta/control-description';

export function initialMetaCheck(
  target: any,
  propertyKey: string
): InitializedControlDescription {
  const metaData: ControlDescription = Reflect.getMetadata(
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
  return metaData as InitializedControlDescription;
}
