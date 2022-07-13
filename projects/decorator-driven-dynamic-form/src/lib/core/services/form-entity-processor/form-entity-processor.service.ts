import { Injectable, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTypes } from '../../models/types/inputs/input-types.enum';
import { UpdateStrategy } from '../../models/types/forms/form-update-strategy';
import { InputNodeImpl } from '../../models/types/inputs/input-node-impl';
import { InputNode } from '../../models/types/inputs/input-node';
import { InputsMetaData } from '../../models/decorators/inputs/inputs-meta-data';
import { FormMetaData } from '../../models/decorators/forms/Form-meta-data';
import { ActionsMetaData } from '../../models/decorators/actions/actions-metadata';
import { CrossValidationMeta } from '../../models/decorators/validation/cross/CrossValidationMeta';
import { ValidationsMetaData } from '../../models/decorators/validation/sync/ValidationsMetaData';
import { AsyncValidationMeta } from '../../models/decorators/validation/async/async-validation-meta-data';
import {
  UseContext,
  USE_CONTEXT_META_KEY,
  ON_CONTEXT_META_KEY,
  ContextSpecs,
} from '../../models/decorators/context/form-context';
import 'reflect-metadata';

@Injectable()
export class FormEntityProcessorService {
  constructor(private injector: Injector) {}
  public process(formEntity: any, context?: UseContext): InputNode {
    const node = this.createContextualNode(formEntity, context || '');
    // subscribe to enable or disable controls
    node?.getControl()!.valueChanges.subscribe((formValue) => {
      node!.getChildren()?.forEach((d) => {
        if (d.getProperty('enableFn')) {
          switch (d.getProperty('enableFn')(formValue)) {
            case true:
              d!.getControl()?.enable({ emitEvent: false });
              break;

            case false:
              d!.getControl()?.disable({ emitEvent: false });
              break;
          }
        }
      });
    });
    return node;
  }

  private createContextualNode(
    entity: any,
    context: UseContext,
    parentProperties?: Map<string, any>
  ): InputNode {
    const formProperties = parentProperties || FormMetaData.get(entity);
    const actions = ActionsMetaData.get(entity);
    if (formProperties) {
      formProperties.set('actions', actions);
    }

    const childInputs = [] as InputNode[];
    for (const key in entity) {
      const ctx = Reflect.getMetadata(USE_CONTEXT_META_KEY, entity, key);
      if (ctx && context && context != ctx) {
        console.log('ctx ', ctx, 'context ', context);
        continue;
      }

      const properties = InputsMetaData.get(entity, key);
      if (properties && properties?.get('inputType') != InputTypes.COMPOSITE) {
        const contextSpecs: ContextSpecs = Reflect.getMetadata(
          ON_CONTEXT_META_KEY,
          entity,
          key
        );
        if (contextSpecs && contextSpecs.context == context) {
          Object.entries(contextSpecs.properties).forEach(([k, v]) => {
            properties.set(k, v);
          });
        }

        const { validators, errorMap } =
          ValidationsMetaData.getValidatorsAndErrorMap(entity, key);

        if (validators.includes(Validators.required)) {
          properties.set('required', true); // if required set required attribute
        }
        const formControl = new FormControl(
          entity[key], //initialize
          validators
        );
        // async validation
        const asyncValAndError = AsyncValidationMeta.getValidatorsAndErrorMap(
          entity,
          key
        );
        // console.log(asyncValAndError);
        asyncValAndError.validators.forEach((asyncVal) => {
          // console.log(asyncVal);

          if (asyncVal?.provider) {
            const injValidator = this.injector.get(asyncVal?.provider);
            // console.log('async validation processing', injValidator);
            formControl.addAsyncValidators(injValidator.validate);
            // formControl.updateValueAndValidity();
          } else if (asyncVal.validate) {
            formControl.addAsyncValidators(asyncVal.validate);
          } else if (typeof asyncVal == 'function') {
            formControl.addAsyncValidators(asyncVal);
          }
        });
        asyncValAndError.errorMap.forEach((value, key) => {
          errorMap.set(key, value);
        });
        const inputNode = new InputNodeImpl(properties, formControl, errorMap);
        // console.log(inputNode);
        childInputs.push(inputNode);
      } else if (
        properties &&
        properties?.get('inputType') == InputTypes.COMPOSITE
      ) {
        const nestedFormEntity = new (properties?.get('declaredClass'))();
        // initialize nested form entity values
        if (entity[key] != null) {
          Object.keys(entity[key]).forEach((k) => {
            nestedFormEntity[k] = entity[key][k];
          });
        }
        const nestedFormNode = this.createContextualNode(
          nestedFormEntity,
          context,
          new Map(formProperties)
        );

        // fill node properties with nested form properties
        for (const propertyKeyValue of properties.entries()) {
          nestedFormNode.addProperty(propertyKeyValue[0], propertyKeyValue[1]);
        }
        // override nested form properties with its parent properties
        // warn??
        for (const propertyKeyValue of formProperties.entries()) {
          if (
            propertyKeyValue[0] != 'name' &&
            propertyKeyValue[0] != 'action'
          ) {
            nestedFormNode.addProperty(
              propertyKeyValue[0],
              propertyKeyValue[1]
            );
          }
        }

        childInputs.push(nestedFormNode);
      }
    }

    // update strategy
    let updateOn: 'change' | 'blur' | 'submit';
    switch (formProperties.get('updateStrategy') as UpdateStrategy) {
      case UpdateStrategy.ON_PLUR:
        updateOn = 'blur';
        break;

      case UpdateStrategy.ON_SUBMIT:
        updateOn = 'submit';
        break;

      default:
        updateOn = 'change';
        break;
    }

    const fomGroupInitializer: { [x: string]: any } = {};
    childInputs.forEach((inputNode) => {
      fomGroupInitializer[inputNode.getProperty('name')] =
        inputNode.getControl();
    });

    const formNode: InputNode = new InputNodeImpl(
      formProperties,
      new FormGroup(fomGroupInitializer, { updateOn: updateOn }),
      new Map()
    );
    formNode.addChildren(childInputs);
    // cross validation //
    const crossValidators = CrossValidationMeta.get(entity);
    if (crossValidators && crossValidators.length > 0) {
      crossValidators.forEach((cv) => {
        formNode.getControl().addValidators([cv.validatorFn]);
        formNode.getControl().updateValueAndValidity();
      });
    }

    crossValidators?.forEach((validator) => {
      validator.effects.forEach((effect) => {
        const relatedInput = formNode
          .getChildren()
          ?.find((i) => i.getProperty('name') == effect.input);

        relatedInput?.addError(validator.errorName, effect.message);
      });
    });
    return formNode;
  }
}
