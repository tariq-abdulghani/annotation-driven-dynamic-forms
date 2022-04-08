import { AbstractControl } from '@angular/forms';

export interface InputNode {
  setProperties(map: Map<string, any>): void;
  addProperty(key: string, value: any): void;
  getProperty(key: string): any;

  setControl(control: AbstractControl): void;
  getControl(): AbstractControl;

  setErrorMap(map: Map<string, string>): void;
  getError(key: string): string | undefined;
  addError(key: string, value: string): void;

  addChild(node: InputNode): void;
  addChildren(nodes: InputNode[]): void;
  getChildren(): InputNode[] | null;

  isValid(): boolean;
  inValid(): boolean;
  isPending(): boolean;
}
