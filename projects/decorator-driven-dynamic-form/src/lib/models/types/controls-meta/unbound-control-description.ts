import { ValidatorFn } from '@angular/forms';
import { ControlTypes } from '../control-types.enum';
import { ControlMetaData } from './controls-meta';

export interface UnboundControlDescription extends ControlMetaData {
  controlType: ControlTypes;
  propertyKey: string;
  formControl: null;
  errorMap: Map<string, string>;
  validators: ValidatorFn[];
}
