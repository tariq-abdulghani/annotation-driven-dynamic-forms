import { Type } from '@angular/core';
import { InputComponent } from '../components/input/input.component';

export class InputComponentRegistry {
  private static registeredInputs: Map<string, Type<InputComponent>> =
    new Map();

  public static get(key: string): Type<InputComponent> | undefined {
    return InputComponentRegistry.registeredInputs.get(key);
  }

  public static set(key: string, component: Type<InputComponent>) {
    InputComponentRegistry.registeredInputs.set(key, component);
  }
}
