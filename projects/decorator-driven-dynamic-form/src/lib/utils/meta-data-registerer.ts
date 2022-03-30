import 'reflect-metadata';

export class MetaDataRegisterer {
  static add(target: any, propertyKey: string, metaData: any): void {
    Reflect.defineMetadata(propertyKey, metaData, target, propertyKey);
  }

  static get<T>(target: any, propertyKey: string): T {
    return Reflect.getMetadata(propertyKey, target, propertyKey) as T;
  }
}
