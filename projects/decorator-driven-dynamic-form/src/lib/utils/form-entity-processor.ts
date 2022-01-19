import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from '../models/types/control-types.enum';
import { FormLayout } from '../models/types/form-layout-enum';
import { FormDescriptor } from '../models/types/descriptors';

export class FormEntityProcessor {
  /**
   * Generates Form Descriptor an object that contains meta data in a tree like data structure
   *
   * @param formEntity instance of Class annotated with '@FormModel'
   * @returns
   */
  public static generateFormDescriptor(formEntity: {
    [x: string]: any;
  }): FormDescriptor {
    // no need for recursion to generate all descriptors in child controls
    // the way decorators work works on all of them

    // console.warn(
    //   'only two levels are supported in this functions if more levels are needed please implement that'
    // );

    const formDescriptor = new FormDescriptor();
    const formGroupInitializer = {} as { [x: string]: any }; // form group initializer key string control name value FormControl

    // getting fields and set them in the descriptor
    Object.entries(formEntity).forEach((keyValue) => {
      //@ts-ignore
      formDescriptor[keyValue[0]] = keyValue[1];
    });

    // scans all enumerated fields including property setters and getters
    for (const key in formEntity) {
      const metaData = Reflect.getMetadata(key, formEntity, key);
      // console.log('no meta data');
      if (metaData && metaData.controlType != ControlTypes.Composite) {
        const descriptor = { ...metaData };

        const formControl = new FormControl(
          formEntity[key],
          descriptor.validators
        );

        formGroupInitializer[descriptor.name] = formControl;
        descriptor.formControl = formControl;
        formDescriptor.controlsDescriptor.push(descriptor);
        const setter = function (val?: any) {
          formControl?.setValue(val);
        };

        const getter = function () {
          return formControl?.value;
        };

        Object.defineProperty(formEntity, key, {
          set: setter,
          get: getter,
          enumerable: true,
        });
      }

      if (metaData && metaData.controlType == ControlTypes.Composite) {
        formDescriptor.controlsDescriptor.push(metaData);
        formGroupInitializer[metaData.name] = metaData.formGroup;
      }
    }
    // updates form group on submit
    formDescriptor.formGroup = new FormGroup(formGroupInitializer);
    return formDescriptor;
  }
}

export function bindObjectToForm(
  obj: { [x: string]: any },
  descriptors: any[]
): FormGroup {
  const objGroup = {} as { [x: string]: any };
  Object.entries(obj).forEach((keyValue) => {
    if (obj[keyValue[0]] instanceof Object) {
      objGroup[keyValue[0]] = bindObjectToForm(obj[keyValue[0]], descriptors);
      // proper setter and getter for form group
      // get all meta data and convert it to descriptor
    } else {
      objGroup[keyValue[0]] = new FormControl(obj[keyValue[0]]);
      // proper setter and getter for form control
      // get all meta data and convert it to descriptor
    }
  });
  return new FormGroup(objGroup);
}
