import { Type } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { InputComponentRegistry } from '../input-components-registry';

export function DynamicFormInput(specs: { id: string }) {
  return function <T extends Type<InputComponent>>(constructor: T) {
    InputComponentRegistry.set(specs.id, constructor);
    return constructor;
  };
}
