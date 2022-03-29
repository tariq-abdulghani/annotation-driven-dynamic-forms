import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTypes } from '../../models/types/inputs-meta/input-types.enum';
import { UpdateStrategy } from '../../models/types/forms-meta/form-update-strategy';
import {
  FormMeta,
  NestedFormMeta,
} from '../../models/types/forms-meta/form-meta';
import { InputDescription } from '../../models/types/inputs-meta/input-description';
import { MetaDataRegisterer } from '../../models/types/inputs-meta/meta-data-registerer';
import { InputSpec } from '../../models/types/inputs-meta/input-specs';
import { BasicAction } from '../../models/types/actions/actions-api';
import { CrossValidationProcessor } from '../../models/decorators/validation/cross-validation';

@Injectable()
export class FormEntityProcessorService {
  constructor() {}

  public describe(formEntity: {
    meta?: FormMeta;
    [x: string]: any;
  }): InputDescription<any> {
    const formDescription = new InputDescription<any>(
      formEntity.meta,
      InputTypes.COMPOSITE
    );

    const crossValidators = CrossValidationProcessor.process(formEntity);
    if (crossValidators.length > 0) {
      crossValidators.forEach((cv) => {
        formDescription.errorMap.set(cv.spec.id, cv.spec.message || '');
        formDescription.validators.push(cv.spec.validatorFn);
      });
    }

    const formGroupInitializer = {} as { [x: string]: any };

    // find actions and put them in meta attribute
    Object.entries(formEntity).forEach(([propertyKey, propertyValue]) => {
      if (!MetaDataRegisterer.get(formEntity, propertyKey)) {
        // (formDescription as { [x: string]: any })[propertyKey] = propertyValue;
        if (formEntity[propertyKey] instanceof BasicAction) {
          formEntity.meta?.actions.push(formEntity[propertyKey]);
          delete formEntity[propertyKey];
        }
      }
    });

    for (const key in formEntity) {
      const metaData = MetaDataRegisterer.get(formEntity, key);
      if (metaData instanceof InputDescription) {
        const formControl = new FormControl(
          formEntity[key],
          metaData.validators
        );

        const boundDescription = metaData.cloneAndBind(formControl);
        if (formDescription.childInputs == null) {
          formDescription.childInputs = [];
        }
        formDescription.childInputs?.push(boundDescription);
        formGroupInitializer[metaData.meta.name] = formControl;
        this.bindFieldToFormControl(formEntity, key, formControl);
      } else if (metaData instanceof NestedFormMeta) {
        console.warn('metaData instanceof NestedFormMeta', metaData);
        const nestedFormEntity = new metaData.declaredClass();
        const nestedFormDescription = this.describe(nestedFormEntity);
        // bind formDescription to nested form entity
        nestedFormEntity.control = nestedFormDescription.control;
        // initialize
        nestedFormEntity.valueSetter(formEntity[key]);
        formDescription.childInputs!.push(nestedFormDescription);
        nestedFormDescription.meta.legend = metaData.legend; // todo investigate
        nestedFormDescription.meta.width = metaData.width; // todo investigate
        nestedFormDescription.meta.labelStyling = formEntity.meta?.labelStyling; // label styling must be inherited
        formGroupInitializer[metaData.name] = nestedFormDescription.control;

        this.bindCompositeFieldToFormGroup(formEntity, key, nestedFormEntity);
      }
    }

    switch (formEntity!.meta?.updateStrategy) {
      case UpdateStrategy.EAGER:
        formDescription.control = new FormGroup(formGroupInitializer, {
          updateOn: 'change',
        });
        break;

      case UpdateStrategy.LAZY:
        formDescription.control = new FormGroup(formGroupInitializer, {
          updateOn: 'blur',
        });
        break;

      case UpdateStrategy.ACTION:
        formDescription.control = new FormGroup(formGroupInitializer, {
          updateOn: 'submit',
        });
        break;
    }
    // set error messages here ??
    formDescription.control?.addValidators(formDescription.validators);
    crossValidators.forEach((v) => {
      // v.spec.inputs.forEach(input=>{
      //   formDescription.childInputs?.find(i => i.errorMap.set())
      // })
    });
    return formDescription;
  }

  public process(formEntity: any): any {
    const description = this.describe(
      formEntity
    ) as InputDescription<InputSpec>;
    // subscribe to enable or disable controls
    description?.control!.valueChanges.subscribe((formValue) => {
      // console.log('form value change', formValue);
      description!.childInputs?.forEach((d) => {
        if (d.meta.enableFn) {
          switch (d.meta.enableFn(formValue)) {
            case true:
              d!.control?.enable({ emitEvent: false });
              break;

            case false:
              d!.control?.disable({ emitEvent: false });
              break;
          }
        }
      });
    });
    return description;
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
    const fc = formControl;
    const setter = function (val?: any) {
      fc.setValue(val);
    };

    const getter = function () {
      return fc.value;
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
      formEntity.valueSetter(val);
    };

    const getter = function () {
      // return formEntity.formGroup?.value || formEntity;
      return formEntity;
    };

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
      enumerable: true,
    });
  }
}
