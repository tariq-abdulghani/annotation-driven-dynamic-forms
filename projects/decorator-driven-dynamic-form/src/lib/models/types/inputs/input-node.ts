import { AbstractControl } from '@angular/forms';

export interface IInputNode {
  setProperties(map: Map<string, any>): void;
  addProperty(key: string, value: any): void;
  getProperty(key: string): any;

  setControl(control: AbstractControl): void;
  getControl(): AbstractControl;

  setErrorMap(map: Map<string, string>): void;
  getError(key: string): string | undefined;
  addError(key: string, value: string): void;

  addChild(node: IInputNode): void;
  addChildren(nodes: IInputNode[]): void;
  getChildren(): IInputNode[] | null;

  isValid(): boolean;
  inValid(): boolean;
  isPending(): boolean;
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

  addChild(node: InputNode) {
    if (this.childNodes != null) {
      this.childNodes.push(node);
    } else {
      this.childNodes = [node];
    }
  }

  addChildren(nodes: InputNode[]) {
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
  isValid() {}
  inValid() {}
  isPending() {}
}
