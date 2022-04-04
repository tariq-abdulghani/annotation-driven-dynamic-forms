import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTypes } from '../../models/types/inputs/input-types.enum';
import { UpdateStrategy } from '../../models/types/forms/form-update-strategy';
import { FormMeta, NestedFormMeta } from '../../models/types/forms/form-meta';
import {
  InputDescription,
  InputNode,
} from '../../models/types/inputs/input-description';
import { MetaDataRegisterer } from '../../utils/meta-data-registerer';
import { InputSpec } from '../../models/types/inputs/input-specs';
import { BasicAction } from '../../models/types/actions/actions-api';
import { CrossValidationMeta } from '../../models/decorators/validation/cross-validation';
import { InputsMetaData } from '../../models/decorators/inputs/inputs-meta-data';
import { Validations } from '../../models/decorators/validation/validations';
import { FormMetaData } from '../../models/decorators/forms/forms';
import { ActionsMetaData } from '../../models/decorators/actions/actions-metadata';

@Injectable()
export class FormEntityProcessorService {
  constructor() {}

  public describe(formEntity: {
    meta?: FormMeta;
    [x: string]: any;
  }): InputDescription {
    
    const properties = FormMetaData.get(formEntity);
    const actions = ActionsMetaData.get(formEntity);
    if(properties){
      properties.set('actions', actions);
    }
    console.log("form meta data",properties);

    // new InputNode(properties, new FormGroup({'', new}), new Map());
    

    const formDescription = new InputDescription(
      formEntity.meta,
      InputTypes.COMPOSITE
    );
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
    // enhancements migration
    for (const key in formEntity) {
      const properties = InputsMetaData.get(formEntity, key);
      if (properties && properties?.get('inputType') != InputTypes.COMPOSITE) {
        const {validators, errorMap} = Validations.getValidatorsAndErrorMap(
          formEntity,
          key
        );
        const formControl = new FormControl(
          formEntity[key], //initialize
          validators
        );
        const inputNode = new InputNode(
          properties,
          formControl,
          errorMap
        );
        console.log(inputNode);
      }
    }
    //
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
        formGroupInitializer[metaData.properties.get('name')] = formControl;
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
        nestedFormDescription.properties.add('legend', metaData.legend); //. = metaData.legend; // todo investigate
        nestedFormDescription.properties.add('width', metaData.width); // todo investigate
        nestedFormDescription.properties.add('name', metaData.name); // todo investigate
        nestedFormDescription.properties.add(
          'labelStyling',
          formEntity.meta?.labelStyling
        ); // label styling must be inherited
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

    formDescription.control?.addValidators(formDescription.validators);

    // set error messages here ??
    // will not work with nested ones they have no name in meta data
    const crossValidators = CrossValidationMeta.get(formEntity);
    if (crossValidators && crossValidators.length > 0) {
      crossValidators.forEach((cv) => {
        // formDescription.errorMap.set(cv.spec.id, cv.spec.message || '');
        formDescription.validators.push(cv.validatorFn);
      });
    }
    
    crossValidators?.forEach((validator) => {
      validator.effects.forEach((effect) => {
        const relatedInput = formDescription.childInputs?.find(
          (i) => i.properties.get('name') == effect.input
        );
        // console.log('related input ', relatedInput, input.errorConfig);
        relatedInput?.errorMap.set(validator.errorName, effect.message);
        // console.log('related input ', relatedInput);
      });
    });
    return formDescription;
  }

  public process(formEntity: any): any {
    const description = this.describe(formEntity) as InputDescription;
    // subscribe to enable or disable controls
    description?.control!.valueChanges.subscribe((formValue) => {
      // console.log('form value change', formValue);
      description!.childInputs?.forEach((d) => {
        if (d.properties.get('enableFn')) {
          switch (d.properties.get('enableFn')(formValue)) {
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
