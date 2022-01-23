import { FormGroup } from '@angular/forms';
import { ControlTypes } from '../control-types.enum';
import { FormLayout } from '../form-layout-enum';
import { ControlDescription } from '../controls-meta/control-description';

export class NestedFormDescription {
  name: string = '';
  controlType = ControlTypes.Composite;
  formLayout: string = FormLayout.GRID;
  controlsDescriptions: (ControlDescription & NestedFormDescription)[] = [];
  formGroup!: FormGroup;
  instance: any;
  propertyKey: string = '';
  isGrid = () => {
    return this.formLayout == FormLayout.GRID;
  };
}
