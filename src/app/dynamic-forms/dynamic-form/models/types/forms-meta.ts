import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from './control-types.enum';
import { FormLayout } from './form-layout-enum';

export interface ControlDescriptor {
  name: string;
  controlType: ControlTypes;
  width?: number;
  style?: string;
  class?: string;
  formControl: FormControl;
  [x: string]: any;
}

export class FormDescriptor {
  showReset: boolean = false;
  resetBtnLabel: string = 'reset';
  submitBtnLabel: string = 'submit';
  formLayout: string = FormLayout.GRID;
  controlsDescriptor: (ControlDescriptor & NestedFormDescriptor)[] = [];
  formGroup!: FormGroup;
  smartSetter: (value: any) => void = () => {};
}

export class NestedFormDescriptor {
  name: string = '';
  controlType = ControlTypes.Composite;
  formLayout: string = FormLayout.GRID;
  controlsDescriptor: ControlDescriptor[] = [];
  formGroup!: FormGroup;
  instance: any;
  propertyKey: string = '';
}
