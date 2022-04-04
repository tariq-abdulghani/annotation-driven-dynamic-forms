import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InputTypes } from './input-types.enum';
import { InputProperties } from './Input-properties';

export class InputDescription {
  properties: InputProperties;
  control: AbstractControl | null;
  validators: ValidatorFn[];
  errorMap: Map<string, string>;
  childInputs: InputDescription[] | null;
  inputType: InputTypes;
  cloneAndBind(control: AbstractControl): InputDescription {
    const bound = new InputDescription({}, this.inputType);
    bound.control = control;
    bound.validators = this.validators;
    bound.errorMap = this.errorMap;
    bound.childInputs = this.childInputs;
    bound.properties.setProperties(this.properties.getProperties());
    return bound;
  }
  addError() {}

  constructor(specs: any, controlType: InputTypes) {
    this.control = null;
    this.errorMap = new Map();
    this.validators = [];
    this.childInputs = null;
    this.inputType = controlType;
    this.properties = new InputProperties(specs);
  }

  // constructor(properties: InputProperties, ) {
  // }
}

export class InputNode {
  private properties: Map<string, any>;
  private control: AbstractControl;
  private errorMap: Map<string, string>;
  private childNodes: InputNode[] | null;

  /**
   *
   */
  constructor(
    properties: Map<string, any>,
    control: AbstractControl,
    errorMap: Map<string, string>
  ) {
    this.childNodes = null;
    this.control = control;
    this.properties = properties;
    this.errorMap = errorMap;
  }

  public setProperties(map: Map<string, any>) {
    this.properties = map;
  }
  public addProperty(key: string, value: any) {
    this.properties.set(key, value);
  }

  public getProperty(key: string) {
    return this.properties.get(key);
  }

  public setControl(control: AbstractControl) {
    this.control = control;
  }

  public getControl() {
    return this.control;
  }

  public setErrorMap(map: Map<string, string>) {
    this.errorMap = map;
  }

  getError(key: string) {
    return this.errorMap.get(key);
  }

  addError(key: string, value: string) {
    this.errorMap.set(key, value);
  }

  appendChild(node: InputNode) {
    if (this.childNodes != null) {
      this.childNodes.push(node);
    } else {
      this.childNodes = [node];
    }
  }
  getChildren() {
    return this.childNodes;
  }

  // enable
  // disable
  isValid() {}
  inValid() {}
  isPending() {}
}
