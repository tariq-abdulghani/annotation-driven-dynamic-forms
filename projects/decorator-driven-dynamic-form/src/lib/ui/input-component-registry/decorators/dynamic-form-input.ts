import { Type } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { InputComponentRegistry } from '../input-components-registry';

export function DynamicFormInput(specs: { inputType: string }) {
  return function <T extends Type<InputComponent>>(constructor: T) {
    InputComponentRegistry.set(specs.inputType.toUpperCase(), constructor);
    return constructor;
  };
}
