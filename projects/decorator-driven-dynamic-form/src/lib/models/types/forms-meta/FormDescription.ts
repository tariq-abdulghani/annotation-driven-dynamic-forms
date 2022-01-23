import { FormGroup } from '@angular/forms';
import { BasicActionMeta } from '../actions-api';
import { ControlDescription } from '../controls-meta/control-description';
import { FormLayout } from '../form-layout-enum';

import { NestedFormDescription } from './NestedFormDescription';

export class FormDescription {
  formLayout: string = FormLayout.GRID;
  controlsDescriptions: (ControlDescription & NestedFormDescription)[] = [];
  formGroup!: FormGroup;
  submit: BasicActionMeta = { label: 'submit', class: 'btn btn-primary' };
  reset: BasicActionMeta | null = null;
  smartSetter: (value: any) => void = () => {};
  isGrid = () => {
    return this.formLayout == FormLayout.GRID;
  };
}
