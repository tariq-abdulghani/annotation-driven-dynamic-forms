import { FormGroup } from '@angular/forms';
import { BasicActionMeta } from '../actions-api';
import { ControlDescription } from '../controls-meta/control-description';
import { FormLayout } from '../form-layout-enum';

import { NestedFormDescription } from './NestedFormDescription';

// used  as ref for the resultant form description
export class FormDescription {
  submit: BasicActionMeta = { label: 'submit', class: 'btn btn-primary' };
  reset: BasicActionMeta | null = null;

  formLayout: string = FormLayout.GRID;
  controlsDescriptions: (ControlDescription & NestedFormDescription)[] = [];
  formGroup!: FormGroup;

  smartSetter: (value: any) => void = () => {};
  isGrid = () => {
    return this.formLayout == FormLayout.GRID;
  };
}
