import { FormGroup } from '@angular/forms';
import { ControlTypes } from '../control-types.enum';
import { FormLayout } from '../form-layout-enum';
import { ControlDescription } from '../controls-meta/control-description';

// used  as ref for the resultant form description
export class NestedFormDescription {
  name: string = ''; // form control name
  legend?: string; // displayed legend
  propertyKey: string = '';
  controlType = ControlTypes.Composite;
  //
  formLayout: string = FormLayout.GRID;
  controlsDescriptions: (ControlDescription & NestedFormDescription)[] = [];
  formGroup!: FormGroup;

  smartSetter: (value: any) => void = () => {};
  isGrid = () => {
    return this.formLayout == FormLayout.GRID;
  };
}
