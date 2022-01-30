import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';
import { Observable } from 'rxjs';

export interface FieldSetMeta {
  legend: string;
}
export interface ControlMetaData {
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: number;
  style?: string;
  class?: string;
  enableFn?: (formValue: any) => boolean;
  readonly?: boolean;
  [x: string]: any;
}

export interface DateControlMeta extends ControlMetaData {}

export interface TextControlMeta extends ControlMetaData {
  type: 'text' | 'password' | 'email' | 'url' | 'tel';
}

export interface NumberControlMeta extends ControlMetaData {}

/**
 * bindLabel string to bind to
 * bindValue: string | null
 */
export interface SelectControlMeta extends ControlMetaData {
  bindLabel: string;
  bindValue: string | null;
  compareWith: (a: any, b: any) => boolean;
  dataSource: URL | any[] | Observable<any[]>;
}

export interface CheckboxMeta extends ControlMetaData {}

export interface RadioButtonsMeta extends ControlMetaData, FieldSetMeta {
  bindLabel: string;
  bindValue: string | null;
  dataSource: URL | any[] | Observable<any[]>;
}
