import { ControlTypes } from '../control-types.enum';
import { ControlDescription } from './control-description';
import { CheckboxMeta } from './controls-meta';

//@ts-ignore

export interface CheckboxDescription extends ControlDescription, CheckboxMeta {
  controlType: ControlTypes.Checkbox;
  type: 'checkbox';
}
