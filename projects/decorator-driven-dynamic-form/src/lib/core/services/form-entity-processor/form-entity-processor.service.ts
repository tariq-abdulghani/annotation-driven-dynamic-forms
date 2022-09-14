import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputTypes } from '../../models/types/inputs/input-types.enum';
import { UpdateStrategy } from '../../models/types/forms/form-update-strategy';
import { InputNodeImpl } from '../../models/types/inputs/input-node-impl';
import { InputNode } from '../../models/types/inputs/input-node';
import { InputsMetaData } from '../../models/decorators/inputs/inputs-meta-data';
import { FormMetaData } from '../../models/decorators/forms/Form-meta-data';
import { ActionsMetaData } from '../../models/decorators/actions/actions-metadata';
import { CrossValidationMeta } from '../../models/decorators/validation/cross/CrossValidationMeta';
import {
  UseContext,
  USE_CONTEXT_META_KEY,
} from '../../models/decorators/context/form-context';
import 'reflect-metadata';
import { InputProcessorService } from '../input-processor/input-processor.service';

@Injectable()
export class FormEntityProcessorService {
  constructor(private inputProcessor: InputProcessorService) {}

  /**
   *Builds tree like structure from form entities
   *
   * @param formEntity class annotated with `FormEntity`
   * @param context `string` for proper usage please go to docs
   * @returns `InputNode` tree of input nodes
   */
  public process(formEntity: any, context?: UseContext): InputNode {
    const root = this.parse(formEntity, context || '');
    this.processEnableFn(root); // this.handleEnableFn(node, (node.getControl() as FormGroup).getRawValue()); // should nt be here
    this.processOrder(root);
    return root;
  }

  /**
   * Used internally to build input nodes
   *
   * @param entity class annotated with `FormEntity`
   * @param context `string` for proper usage please go to docs
   * @param parentProperties `Map<string, any>`
   * @returns `InputNode`
   */
  private parse(
    entity: any,
    context: UseContext,
    parentProperties?: Map<string, any>
  ): InputNode {
    // handling actions meta data
    const formProperties = parentProperties || FormMetaData.get(entity);
    const actions = ActionsMetaData.get(entity);
    if (formProperties) {
      formProperties.set('actions', actions);
    }

    const childInputs = [] as InputNode[];

    this.processUseContext(entity, context).forEach((key) => {
      if (this.isNotComposite(entity, key)) {
        const inputNode = this.inputProcessor.process(entity, context, key);
        childInputs.push(inputNode);
      } else if (this.isComposite(entity, key)) {
        const nestedFormNode = this.processNestedForm(
          entity,
          context,
          key,
          formProperties
        );
        childInputs.push(nestedFormNode);
      } else {
        // some fields have no meta data they must not be processed
      }
    });

    const fomGroupInitializer: { [x: string]: any } = {};
    childInputs.forEach((inputNode) => {
      fomGroupInitializer[inputNode.getProperty('name')] =
        inputNode.getControl();
    });

    const formNode: InputNode = new InputNodeImpl(
      formProperties,
      new FormGroup(fomGroupInitializer, {
        updateOn: this.processUpdateStrategy(formProperties),
      }),
      new Map()
    );
    formNode.addChildren(childInputs);
    this.processCrossValidation(entity, formNode);

    return formNode;
  }

  /**
   *Returns attributes within given context
   *
   * @param entity
   * @param context
   * @returns `string[]` attributes within context
   */
  private processUseContext(entity: any, context: string): string[] {
    const inContextAttrs: string[] = [];
    for (const key in entity) {
      const ctx = Reflect.getMetadata(USE_CONTEXT_META_KEY, entity, key);
      if (ctx && context && context != ctx) {
        // console.log('ctx ', ctx, 'context ', context);
        continue;
      } else {
        inContextAttrs.push(key);
      }
    }
    return inContextAttrs;
  }

  /**
   * Used internally to prepare nested form entity and its properties
   * to be used with `createNode`
   *
   * @param entity class with `@FormEntity`
   * @param context `string`
   * @param key `string`
   * @param formProperties parent form properties `Map<string, any>` current impl overrides nested form properties with its parent this may change in the future
   * @returns `InputNode` tree like that holds nodes
   */
  private processNestedForm(
    entity: any,
    context: string,
    key: string,
    formProperties: Map<string, any>
  ): InputNode {
    const properties = InputsMetaData.get(entity, key) || new Map();
    const nestedFormEntity = new (properties?.get('declaredClass'))();
    // initialize nested form entity values
    if (entity[key] != null) {
      Object.keys(entity[key]).forEach((k) => {
        nestedFormEntity[k] = entity[key][k];
      });
    }
    const nestedFormNode = this.parse(
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
      if (propertyKeyValue[0] != 'name' && propertyKeyValue[0] != 'action') {
        nestedFormNode.addProperty(propertyKeyValue[0], propertyKeyValue[1]);
      }
    }
    return nestedFormNode;
  }

  /**
   * Return qupdate strategy form mrta data if not set default `change`
   *
   * @param formProperties
   * @returns
   */
  private processUpdateStrategy(
    formProperties: Map<string, any>
  ): 'change' | 'blur' | 'submit' {
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

    return updateOn;
  }

  /**
   * Applies cross validation to form
   * @param entity
   * @param formNode
   */
  private processCrossValidation(entity: any, formNode: InputNode) {
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
  }

  /**
   * Handles `enableFn` meta attribute
   * @param root `InputNode`
   */
  private processEnableFn(root: InputNode) {
    root?.getControl()!.valueChanges.subscribe((formValue) => {
      root!.getChildren()?.forEach((node: InputNode) => {
        this.applyIfDefined(node, formValue);
      });
    });
  }

  /**
   * Used to apply `enableFn` after setting from value manually and silent change events
   * so keep it consistent
   *
   * @param root `InputNode`
   */
  public applyEnableFn(root: InputNode) {
    root!.getChildren()?.forEach((node: InputNode) => {
      this.applyIfDefined(node, (root.getControl() as FormGroup).getRawValue());
    });
  }
  /**
   * Checks each field recursively to enable or disable it
   * if `enableFn` is defined on it
   *
   * @param root `InputNode`
   * @param formValue `Object`
   */
  private applyIfDefined(node: InputNode, formValue: any) {
    if (!node.hasChildren()) {
      if (node.getProperty('enableFn')) {
        switch (node.getProperty('enableFn')(formValue)) {
          case true:
            node!.getControl()?.enable({ emitEvent: false });
            break;
          case false:
            node!.getControl()?.disable({ emitEvent: false });
            break;
        }
      }
    } else {
      node.getChildren()?.forEach((child) => {
        this.applyIfDefined(child, formValue[node.getProperty('name')]);
      });
    }
  }

  /**
   * Sorts inputs ASC based on `order` `property`
   * @param inputNode `InputNode`
   *
   */
  private processOrder(inputNode: InputNode): void {
    if (!inputNode.hasChildren()) {
      return;
    } else {
      inputNode
        .getChildren()
        ?.sort((a, b) => a.getProperty('order') - b.getProperty('order'));
      inputNode.getChildren()?.forEach((child) => this.processOrder(child));
    }
  }

  private isNotComposite(entity: any, key: string): boolean {
    const properties = InputsMetaData.get(entity, key);
    return properties && properties?.get('inputType') != InputTypes.COMPOSITE
      ? true
      : false;
  }

  private isComposite(entity: any, key: string): boolean {
    const properties = InputsMetaData.get(entity, key);
    return properties && properties?.get('inputType') == InputTypes.COMPOSITE
      ? true
      : false;
  }
}

// handle input

// const contextSpecs: ContextSpecs = Reflect.getMetadata(
//   ON_CONTEXT_META_KEY,
//   entity,
//   key
// );
// if (contextSpecs && contextSpecs.context == context) {
//   Object.entries(contextSpecs.properties).forEach(([k, v]) => {
//     properties.set(k, v);
//   });
// }

// const { validators, errorMap } =
//   ValidationsMetaData.getValidatorsAndErrorMap(entity, key);

// if (validators.includes(Validators.required)) {
//   properties.set('required', true); // if required set required attribute
// }
// const formControl = new FormControl(
//   entity[key], //initialize
//   validators
// );
// // async validation
// const asyncValAndError = AsyncValidationMeta.getValidatorsAndErrorMap(
//   entity,
//   key
// );
// // console.log(asyncValAndError);
// asyncValAndError.validators.forEach((asyncVal) => {
//   // console.log(asyncVal);

//   if (asyncVal?.provider) {
//     const injValidator = this.injector.get(asyncVal?.provider);
//     // console.log('async validation processing', injValidator);
//     formControl.addAsyncValidators(injValidator.validate);
//     // formControl.updateValueAndValidity();
//   } else if (asyncVal.validate) {
//     formControl.addAsyncValidators(asyncVal.validate);
//   } else if (typeof asyncVal == 'function') {
//     formControl.addAsyncValidators(asyncVal);
//   }
// });
// asyncValAndError.errorMap.forEach((value, key) => {
//   errorMap.set(key, value);
// });
// const inputNode = new InputNodeImpl(properties, formControl, errorMap);
// console.log(inputNode);

//

// handle nested forms

// const nestedFormEntity = new (properties?.get('declaredClass'))();
// // initialize nested form entity values
// if (entity[key] != null) {
//   Object.keys(entity[key]).forEach((k) => {
//     nestedFormEntity[k] = entity[key][k];
//   });
// }
// const nestedFormNode = this.createNode(
//   nestedFormEntity,
//   context,
//   new Map(formProperties)
// );

// // fill node properties with nested form properties
// for (const propertyKeyValue of properties.entries()) {
//   nestedFormNode.addProperty(propertyKeyValue[0], propertyKeyValue[1]);
// }
// // override nested form properties with its parent properties
// // warn??
// for (const propertyKeyValue of formProperties.entries()) {
//   if (
//     propertyKeyValue[0] != 'name' &&
//     propertyKeyValue[0] != 'action'
//   ) {
//     nestedFormNode.addProperty(
//       propertyKeyValue[0],
//       propertyKeyValue[1]
//     );
//   }
// }

// handle context
// for (const key in entity) {
//   const ctx = Reflect.getMetadata(USE_CONTEXT_META_KEY, entity, key);
//   if (ctx && context && context != ctx) {
//     console.log('ctx ', ctx, 'context ', context);
//     continue;
//   }

//   const properties = InputsMetaData.get(entity, key);
//   if (properties && properties?.get('inputType') != InputTypes.COMPOSITE) {
//     const inputNode = this.handleInput(entity, context, key, properties);
//     childInputs.push(inputNode);
//   } else if (
//     properties &&
//     properties?.get('inputType') == InputTypes.COMPOSITE
//   ) {
//     const nestedFormNode = this.handleNestedForm(
//       entity,
//       context,
//       key,
//       properties,
//       formProperties
//     );
//     childInputs.push(nestedFormNode);
//   }
// }

//  /**
//    *
//    * @param entity
//    * @param context
//    * @param key
//    * @param properties
//    * @returns
//    */
//   private handleInput(
//     entity: any,
//     context: string,
//     key: string,
//     properties: Map<string, any>
//   ): InputNode {
//     // const contextSpecs: ContextSpecs = Reflect.getMetadata(
//     //   ON_CONTEXT_META_KEY,
//     //   entity,
//     //   key
//     // );
//     // if (contextSpecs && contextSpecs.context == context) {
//     //   Object.entries(contextSpecs.properties).forEach(([k, v]) => {
//     //     properties.set(k, v);
//     //   });
//     // }

//     this.handleOnContextOverride(entity, context, key, properties);

//     const { validators, errorMap } = this.handleValidation(
//       entity,
//       context,
//       key,
//       properties
//     );

//     // const { validators, errorMap } =
//     //   ValidationsMetaData.getValidatorsAndErrorMap(entity, key);

//     // if (validators.includes(Validators.required)) {
//     //   properties.set('required', true); // if required set required attribute
//     // }
//     const formControl = new FormControl(
//       entity[key], //initialize
//       validators
//     );
//     this.handleAsyncValidation(entity, key, formControl, errorMap);
//     // async validation
//     // const asyncValAndError = AsyncValidationMeta.getValidatorsAndErrorMap(
//     //   entity,
//     //   key
//     // );
//     // // console.log(asyncValAndError);
//     // asyncValAndError.validators.forEach((asyncVal) => {
//     //   // console.log(asyncVal);

//     //   if (asyncVal?.provider) {
//     //     const injValidator = this.injector.get(asyncVal?.provider);
//     //     // console.log('async validation processing', injValidator);
//     //     formControl.addAsyncValidators(injValidator.validate);
//     //     // formControl.updateValueAndValidity();
//     //   } else if (asyncVal.validate) {
//     //     formControl.addAsyncValidators(asyncVal.validate);
//     //   } else if (typeof asyncVal == 'function') {
//     //     formControl.addAsyncValidators(asyncVal);
//     //   }
//     // });
//     // asyncValAndError.errorMap.forEach((value, key) => {
//     //   errorMap.set(key, value);
//     // });
//     const inputNode = new InputNodeImpl(properties, formControl, errorMap);
//     return inputNode;
//   }

// /**
//  *
//  * @param entity
//  * @param context
//  * @param key
//  * @param properties
//  */
// private handleOnContextOverride(
//   entity: any,
//   context: string,
//   key: string,
//   properties: Map<string, any>
// ) {
//   const contextSpecs: ContextSpecs = Reflect.getMetadata(
//     ON_CONTEXT_META_KEY,
//     entity,
//     key
//   );
//   if (contextSpecs && contextSpecs.context == context) {
//     Object.entries(contextSpecs.properties).forEach(([k, v]) => {
//       properties.set(k, v);
//     });
//   }
// }

// /**
//  *
//  * @param entity
//  * @param context
//  * @param key
//  * @param properties
//  * @returns
//  */
// private handleValidation(
//   entity: any,
//   context: string,
//   key: string,
//   properties: Map<string, any>
// ) {
//   const { validators, errorMap } =
//     ValidationsMetaData.getValidatorsAndErrorMap(entity, key);

//   if (validators.includes(Validators.required)) {
//     properties.set('required', true); // if required set required attribute
//   }

//   return { validators: validators, errorMap: errorMap };
// }

// /**
//  *
//  * @param entity
//  * @param key
//  * @param formControl
//  * @param errorMap
//  */
// private handleAsyncValidation(
//   entity: any,
//   key: string,
//   formControl: AbstractControl,
//   errorMap: Map<string, any>
// ) {
//   // async validation
//   const asyncValAndError = AsyncValidationMeta.getValidatorsAndErrorMap(
//     entity,
//     key
//   );
//   // console.log(asyncValAndError);
//   asyncValAndError.validators.forEach((asyncVal) => {
//     // console.log(asyncVal);

//     if (asyncVal?.provider) {
//       const injValidator = this.injector.get(asyncVal?.provider);
//       // console.log('async validation processing', injValidator);
//       formControl.addAsyncValidators(injValidator.validate);
//       // formControl.updateValueAndValidity();
//     } else if (asyncVal.validate) {
//       formControl.addAsyncValidators(asyncVal.validate);
//     } else if (typeof asyncVal == 'function') {
//       formControl.addAsyncValidators(asyncVal);
//     }
//   });
//   asyncValAndError.errorMap.forEach((value, key) => {
//     errorMap.set(key, value);
//   });
// }

// private createInputTree(
//   entity: any,
//   context: UseContext,
//   parentProperties?: Map<string, any>
// ): InputNode {
//   const formProperties = parentProperties || FormMetaData.get(entity);
//   const actions = ActionsMetaData.get(entity);
//   if (formProperties) {
//     formProperties.set('actions', actions);
//   }

//   const childInputs = [] as InputNode[];

//   const keys = this.getKeysWithinContext(entity, context);
//   keys.forEach((key) => {
//     if (this.isNotComposite(entity, key)) {
//       const inputNode = this.inputProcessor.process(entity, context, key);
//       childInputs.push(inputNode);
//     } else if (this.isComposite(entity, key)) {
//       const nestedFormNode = this.processNestedForm(
//         entity,
//         context,
//         key,
//         formProperties
//       );
//       childInputs.push(nestedFormNode);
//     } else {
//     }
//   });

//   const fomGroupInitializer: { [x: string]: any } = {};
//   childInputs.forEach((inputNode) => {
//     fomGroupInitializer[inputNode.getProperty('name')] =
//       inputNode.getControl();
//   });

//   const formNode: InputNode = new InputNodeImpl(
//     formProperties,
//     new FormGroup(fomGroupInitializer, {
//       updateOn: this.handleUpdateStrategy(formProperties),
//     }),
//     new Map()
//   );
//   formNode.addChildren(childInputs);
//   this.handleCrossValidation(entity, formNode);

//   return formNode;
// }
