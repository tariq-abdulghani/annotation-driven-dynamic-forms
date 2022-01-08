import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from './control-types.enum';

export type ControlMeta = {
  name: string;
  controlType: ControlTypes;
  width?: number;
  style?: string;
  class?: string;
  formControl: FormControl;
  [x: string]: any;
};

export type FormDescriptor = {
  showReset: boolean;
  resetBtnLabel: string;
  submitBtnLabel: string;
  formLayout?: string;
  controlsMeta: ControlMeta[];
  formGroup: FormGroup;
};

export type NestedFormDescriptor = {
  controlsMeta: ControlMeta[];
  formGroup: FormGroup;
};
