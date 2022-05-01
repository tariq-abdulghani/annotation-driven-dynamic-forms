import { Injectable, Type } from '@angular/core';

@Injectable()
export class EntityRegistry {
  private static registry = new Map<string, Type<any>>();

  public static add(name: string, declaredClass: Type<any>) {
    EntityRegistry.registry.set(name, declaredClass);
  }

  public static get(name: string) {
    return EntityRegistry.registry.get(name);
  }

  public get(name: string) {
    return EntityRegistry.registry.get(name);
  }
}
