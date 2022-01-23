import { FormControl } from '@angular/forms';
import { ControlTypes } from '../control-types.enum';
import { ControlMetaData } from './controls-meta';

export interface InitializedControlDescription extends ControlMetaData {
  controlType: ControlTypes;
  propertyKey: string;
  formControl: FormControl;
  errorMap: Map<string, string>;
}
