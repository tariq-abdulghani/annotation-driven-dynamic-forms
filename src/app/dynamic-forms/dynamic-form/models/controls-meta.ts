import { ValidatorFn } from "@angular/forms";
import 'reflect-metadata';


export interface FormMeta {
  showReset?: boolean;
  resetBtnLabel?: string;
  submitBtnLabel?: string;
  formLayout?: string;
}

export interface ControlMetaData{
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}

export interface DateControlMeta extends ControlMetaData{
  validators: ValidatorFn[];
  minDate?: Date,
  maxDate?: Date,
 
}

export interface TextControlMeta extends ControlMetaData{
  type: string;
  validators: ValidatorFn[];
}

export interface NumberControlMeta extends ControlMetaData{
  validators: ValidatorFn[];
  min?: number,
  max?: number,
}
