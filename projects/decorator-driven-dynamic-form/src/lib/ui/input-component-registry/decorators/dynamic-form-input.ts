import { Type } from '@angular/core';
import { InputTypes } from '../../../core/models/types/inputs/input-types.enum';
import { InputComponent } from '../../components/input/input.component';
import { InputComponentRegistry } from '../input-components-registry';

export function DynamicFormInput(specs: { inputType: string }) {
  return function <T extends Type<InputComponent>>(constructor: T) {
    if (
      specs.inputType.toUpperCase() == InputTypes.COMPOSITE &&
      InputComponentRegistry.get(InputTypes.COMPOSITE)
    ) {
      console.error(
        "can't set inputType to 'COMPOSITE' its reserved for internal use, " +
          'correct inputType in DynamicFormInput(specs: { inputType: string }) for class ' +
          constructor
      );
      return constructor;
    }
    InputComponentRegistry.set(specs.inputType.toUpperCase(), constructor);
    return constructor;
  };
}
