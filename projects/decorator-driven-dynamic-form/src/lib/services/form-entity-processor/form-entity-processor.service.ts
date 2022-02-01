import { Injectable } from '@angular/core';
import {FormDescription} from "../../models/types/forms-meta/FormDescription";
import {ControlTypes} from "../../models/types/control-types.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {ControlsDescription} from "../../models/types/controls-meta/controls-description";
import {NestedFormMeta} from "../../models/types/forms-meta/NestedFormMeta";
import {StringIndexed} from "../../models/types/stirng-indexed";



@Injectable()
export class FormEntityProcessorService {

  constructor() { }
  public  process(formEntity: StringIndexed): FormDescription {
    const description = this.describe(formEntity);
    // subscribe to enable or disable controls
    description.formGroup.valueChanges.subscribe((formValue) => {
      console.log("form value change", formValue);
      description.controlsDescriptions.forEach((d) => {
        if (d.enableFn) {
          switch (d.enableFn(formValue)) {
            case true:
              d.formControl.enable({ emitEvent: false });
              break;

            case false:
              d.formControl.disable({ emitEvent: false });
              break;
          }
        }
      });
    });
    return description;
  }
  private   describe(formEntity: StringIndexed): FormDescription {
    const formDescription = new FormDescription();
    // form group initializer key string control name value FormControl
    const formGroupInitializer = {} as { [x: string]: any };

    // getting fields  with no meta data and set them in the description
    Object.entries(formEntity).forEach(([propertyKey, propertyValue]) => {
      if (!Reflect.hasMetadata(propertyKey, formEntity, propertyKey)) {
        (formDescription as { [x: string]: any })[propertyKey] = propertyValue;
      }
    });

    // scans all enumerated fields including property setters and getters
    for (const key in formEntity) {
      const metaData = Reflect.getMetadata(key, formEntity, key);

      if (metaData && metaData.controlType != ControlTypes.Composite) {
        const formControl = new FormControl(formEntity[key], metaData.validators);
        // bind control to description
        const boundDescription = ControlsDescription.cloneAndBind(
          metaData,
          formControl
        );

        formDescription.controlsDescriptions.push(boundDescription as any);
        formGroupInitializer[metaData.name] = formControl;
        this.bindFieldToFormControl(formEntity, key, formControl);
      }

      if (metaData && metaData.controlType == ControlTypes.Composite) {
        const nestedFrmMeta = metaData as NestedFormMeta;

        const nestedFormEntity = new nestedFrmMeta.classDeclaration();
        // form description is always bound to form group
        let nestedFormDescription = this.describe(nestedFormEntity);
        nestedFormEntity.smartSetter(formEntity[key]);

        formDescription.controlsDescriptions.push(nestedFormDescription as any);
        formGroupInitializer[nestedFrmMeta.name] =
          nestedFormDescription.formGroup;
        this.bindCompositeFieldToFormGroup(formEntity, key, nestedFormEntity);
      }
    }
    // {updateOn: 'blur'}
    formDescription.formGroup = new FormGroup(formGroupInitializer);
    return formDescription;
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
  private bindFieldToFormControl(
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
  private bindCompositeFieldToFormGroup(
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
}
