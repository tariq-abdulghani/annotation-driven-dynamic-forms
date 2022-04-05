import { AbstractControl } from '@angular/forms';
import { InputNode } from './input-node';

export class InputNodeImpl implements InputNode {
  private properties: Map<string, any>;
  private control: AbstractControl;
  private errorMap: Map<string, string>;
  private childNodes: InputNodeImpl[] | null;

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

  addChild(node: InputNodeImpl) {
    if (this.childNodes != null) {
      this.childNodes.push(node);
    } else {
      this.childNodes = [node];
    }
  }

  addChildren(nodes: InputNodeImpl[]) {
    if (this.childNodes != null) {
      this.childNodes.push(...nodes);
    } else {
      this.childNodes = [...nodes];
    }
  }
  getChildren() {
    return this.childNodes;
  }

  // enable
  // disable
  isValid() {
    return this.control.valid;
  }
  inValid() {
    return this.control.invalid;
  }
  isPending() {
    return this.control.pending;
  }
}
