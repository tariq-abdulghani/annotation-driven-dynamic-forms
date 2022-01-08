import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from '../models/types/control-types.enum';
import { FormDescriptor } from '../models/types/forms-meta';

export class FormEntityProcessor {
  /**
   * Generates Form Descriptor an object that contains metata data in a structured way
   *
   * @param formEntity instance of Class annotated with '@FormModel'
   * @returns
   */
  public static generateFormDescriptor(formEntity: any): FormDescriptor {
    console.warn(
      'only two levels are supported in this functions if more levels are needed please implement that'
    );
    const obj = { controlsMeta: [] } as { [x: string]: any }; // formDescriptor empty object
    const formGroupInitializer = {} as { [x: string]: any }; // form group initializer key string control name value FormControl

    // getting fields and set them in the descriptor
    Object.entries(formEntity).forEach((keyValue) => {
      obj[keyValue[0]] = keyValue[1];
    });

    // scans all enumerated fileds including property setters and getters
    for (const key in formEntity) {
      const metaData = Reflect.getMetadata(key, formEntity, key);

      if (metaData && metaData.controlType != ControlTypes.Composite) {
        obj.controlsMeta.push(metaData);
        formGroupInitializer[metaData.name] = metaData.formControl;
      }

      if (metaData && metaData.controlType == ControlTypes.Composite) {
        obj.controlsMeta.push(metaData);
        formGroupInitializer[metaData.name] = metaData.formGroup;
      }
    }
    obj.formGroup = new FormGroup(formGroupInitializer);
    //@ts-ignore
    return obj;
  }
}
