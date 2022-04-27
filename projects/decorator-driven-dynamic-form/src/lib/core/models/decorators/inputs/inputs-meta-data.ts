const INPUTS_METADATA_KEY = Symbol('InputsMetaData');

export class InputsMetaData {
  public static add(properties: any, target: any, propertyKey: string) {
    Reflect.defineMetadata(
      INPUTS_METADATA_KEY,
      InputsMetaData.propertiesToMap(properties),
      target,
      propertyKey
    );
  }

  public static get(
    target: any,
    propertyKey: string
  ): Map<string, any> | undefined {
    return Reflect.getMetadata(INPUTS_METADATA_KEY, target, propertyKey);
  }

  private static propertiesToMap(properties: any) {
    const propertiesMap = new Map<string, any>();
    Object.entries(properties).forEach((entry) => {
      propertiesMap.set(entry[0], entry[1]);
    });
    return propertiesMap;
  }
}
