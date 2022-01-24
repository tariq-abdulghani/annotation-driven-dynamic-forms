import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from '../models/types/control-types.enum';
import { FormDescription } from '../models/types/forms-meta/FormDescription';
import { ControlsDescription } from '../models/types/controls-meta/controls-description';

type StringIndexed = {
  [x: string]: any;
};
export class FormEntityProcessor {
  /**
   * Generates Form Description an object that contains meta data in a tree like data structure
   *
   * @param formEntity instance of Class annotated with `@FormEntity`
   * @returns `formDescription`
   */
  public static generateFormDescription(
    formEntity: StringIndexed
  ): FormDescription {
    const formDescription = new FormDescription();
    // form group initializer key string control name value FormControl
    const formGroupInitializer = {} as { [x: string]: any };

    // getting fields  with no meta data and set them in the description
    Object.entries(formEntity).forEach((keyValue) => {
      if (!Reflect.hasMetadata(keyValue[0], formEntity, keyValue[0])) {
        (formDescription as { [x: string]: any })[keyValue[0]] = keyValue[1];
      }
    });

    // scans all enumerated fields including property setters and getters
    for (const key in formEntity) {
      const metaData = Reflect.getMetadata(key, formEntity, key);

      if (metaData && metaData.controlType != ControlTypes.Composite) {
        const formControl = new FormControl(
          formEntity[key],
          metaData.validators
        );
        // bind control to description
        const boundDescription = ControlsDescription.cloneAndBind(
          metaData,
          formControl
        );

        formDescription.controlsDescriptions.push(boundDescription as any);
        formGroupInitializer[metaData.name] = formControl;
        bindFieldToFormControl(formEntity, key, formControl);
      }

      if (metaData && metaData.controlType == ControlTypes.Composite) {
        const nestedFormEntity = new metaData.classDeclaration();
        // form description is always bound to form group
        let nestedFormDescription =
          this.generateFormDescription(nestedFormEntity);
        nestedFormEntity.smartSetter(formEntity[key]);

        formDescription.controlsDescriptions.push(nestedFormDescription as any);
        formGroupInitializer[metaData.name] = nestedFormDescription.formGroup;
        bindCompositeFieldToFormGroup(formEntity, key, nestedFormEntity);
      }
    }
    formDescription.formGroup = new FormGroup(formGroupInitializer);
    return formDescription;
  }
}

/**
 * Modifies value accessor of the property
 * to set form control when set and get form
 * control value at get
 *
 * @param target object
 * @param propertyKey  name of property
 * @param formControl
 */
function bindFieldToFormControl(
  target: any,
  propertyKey: string,
  formControl: FormControl
) {
  const setter = function (val?: any) {
    formControl.setValue(val);
  };

  const getter = function () {
    return formControl.value;
  };

  Object.defineProperty(target, propertyKey, {
    set: setter,
    get: getter,
    enumerable: true,
  });
}

/**
 * Modifies value accessor to make use of form group functionality
 * it set all its field with given value which is reflected to their form control
 * and gets the value form the corresponding form group
 *
 * @param target objet
 * @param propertyKey property name
 * @param formEntity instance of class annotated with `@FormEntity`
 */
export function bindCompositeFieldToFormGroup(
  target: any,
  propertyKey: string,
  formEntity: any
) {
  const setter = function (val?: any) {
    formEntity.smartSetter(val);
  };

  const getter = function () {
    return formEntity.formGroup?.value;
  };

  Object.defineProperty(target, propertyKey, {
    set: setter,
    get: getter,
    enumerable: true,
  });
}

// export function bindObjectToForm(
//   obj: { [x: string]: any },
//   descriptors: any[]
// ): FormGroup {
//   const objGroup = {} as { [x: string]: any };
//   Object.entries(obj).forEach((keyValue) => {
//     if (obj[keyValue[0]] instanceof Object) {
//       objGroup[keyValue[0]] = bindObjectToForm(obj[keyValue[0]], descriptors);
//       // proper setter and getter for form group
//       // get all meta data and convert it to descriptor
//     } else {
//       objGroup[keyValue[0]] = new FormControl(obj[keyValue[0]]);
//       // proper setter and getter for form control
//       // get all meta data and convert it to descriptor
//     }
//   });
//   return new FormGroup(objGroup);
// }
