import { Injectable, Injector, Type } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ContextSpecs,
  ON_CONTEXT_META_KEY,
} from '../../models/decorators/context/form-context';
import { InputsMetaData } from '../../models/decorators/inputs/inputs-meta-data';
import { AsyncValidationMeta } from '../../models/decorators/validation/async/async-validation-meta-data';
import { ValidationsMetaData } from '../../models/decorators/validation/sync/ValidationsMetaData';
import { InputNode } from '../../models/types/inputs/input-node';
import { InputNodeImpl } from '../../models/types/inputs/input-node-impl';

@Injectable()
export class InputProcessorService {
  constructor(private injector: Injector) {}

  public process(entity: any, context: string, key: string): InputNode {
    const properties = InputsMetaData.get(entity, key) || new Map();
    const formControl = new FormControl(
      entity[key] //initialize
    );
    const errorMap = new Map();

    this.handleOnContextOverride(
      entity,
      context,
      key,
      properties,
      errorMap,
      formControl
    );

    this.handleValidation(
      entity,
      context,
      key,
      properties,
      errorMap,
      formControl
    );

    this.handleAsyncValidation(
      entity,
      context,
      key,
      properties,
      errorMap,
      formControl
    );

    const inputNode = new InputNodeImpl(properties, formControl, errorMap);
    return inputNode;
  }

  /**
   *
   * @param entity
   * @param context
   * @param key
   * @param properties
   */
  private handleOnContextOverride(
    entity: any,
    context: string,
    key: string,
    properties: Map<string, any>,
    errorMap: Map<string, any>,
    control: AbstractControl
  ) {
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
  }

  /**
   *
   * @param entity
   * @param context
   * @param key
   * @param properties
   * @param errorMap
   * @param control
   */
  private handleValidation(
    entity: any,
    context: string,
    key: string,
    properties: Map<string, any>,
    errorMap: Map<string, any>,
    control: AbstractControl
  ) {
    const res = ValidationsMetaData.getValidatorsAndErrorMap(entity, key);

    if (res.validators.includes(Validators.required)) {
      properties.set('required', true); // if required set required attribute
    }

    res.errorMap.forEach(([k, v]) => {
      errorMap.set(k, v);
    });

    control.addValidators(res.validators);
  }

  /**
   *
   * @param entity
   * @param key
   * @param formControl
   * @param errorMap
   */
  private handleAsyncValidation(
    entity: any,
    context: string,
    key: string,
    properties: Map<string, any>,
    errorMap: Map<string, any>,
    formControl: AbstractControl
  ) {
    // async validation
    const asyncValAndError = AsyncValidationMeta.getValidatorsAndErrorMap(
      entity,
      key
    );
    // console.log(asyncValAndError);
    asyncValAndError.validators.forEach((asyncVal) => {
      // console.log(asyncVal);

      if (asyncVal?.provider) {
        const injValidator = this.injector.get(asyncVal?.provider as Type<any>);
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
  }
}
