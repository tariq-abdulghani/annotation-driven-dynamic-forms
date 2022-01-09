import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';
import { Observable } from 'rxjs';
import { FormLayout } from './form-layout-enum';

export interface FormMeta {
  showReset?: boolean;
  resetBtnLabel?: string;
  submitBtnLabel?: string;
  formLayout?: FormLayout;
}

export interface NestedFormMeta {
  name: string;
  classDeclaration: any;
}

export interface ControlMetaData {
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
  validators: ValidatorFn[];
}

export interface DateControlMeta extends ControlMetaData {
  // validators: ValidatorFn[];
  minDate?: Date;
  maxDate?: Date;
}

export interface TextControlMeta extends ControlMetaData {
  type: string;
  // validators: ValidatorFn[];
}

export interface NumberControlMeta extends ControlMetaData {
  // validators: ValidatorFn[];
  min?: number;
  max?: number;
}

/**
 * bindLabel string to bind to
 * bindValue: string | null
 */
export interface SelectControlMeta extends ControlMetaData {
  bindLabel: string;
  bindValue: string | null;
  multiple: true | undefined;
  compareWith: (a: any, b: any) => boolean;
  dataSource: URL | any[] | Observable<any[]>;
}
