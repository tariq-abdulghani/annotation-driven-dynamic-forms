import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from '../models/types/control-types.enum';
import { FormLayout } from '../models/types/form-layout-enum';
import { FormDescriptor } from '../models/types/controls-descriptors.ts';

export class FormEntityProcessor {
  /**
   * Generates Form Descriptor an object that contains metata data in a structured way
   *
   * @param formEntity instance of Class annotated with '@FormModel'
   * @returns
   */
  public static generateFormDescriptor(formEntity: {
    [x: string]: any;
  }): FormDescriptor {
    console.warn(
      'only two levels are supported in this functions if more levels are needed please implement that'
    );

    const formDescriptor = new FormDescriptor();
    const formGroupInitializer = {} as { [x: string]: any }; // form group initializer key string control name value FormControl

    // getting fields and set them in the descriptor
    Object.entries(formEntity).forEach((keyValue) => {
      //@ts-ignore
      formDescriptor[keyValue[0]] = keyValue[1];
    });

    // scans all enumerated fileds including property setters and getters
    for (const key in formEntity) {
      const metaData = Reflect.getMetadata(key, formEntity, key);

      if (metaData && metaData.controlType != ControlTypes.Composite) {
        formDescriptor.controlsDescriptor.push(metaData);
        formGroupInitializer[metaData.name] = metaData.formControl;
      }

      if (metaData && metaData.controlType == ControlTypes.Composite) {
        formDescriptor.controlsDescriptor.push(metaData);
        formGroupInitializer[metaData.name] = metaData.formGroup;
      }
    }
    formDescriptor.formGroup = new FormGroup(formGroupInitializer);
    return formDescriptor;
  }
}
