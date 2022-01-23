import { ControlTypes } from '../control-types.enum';
import { ControlDescription } from './control-description';
import { NumberControlMeta } from './controls-meta';

export interface NumberControlDescription
  extends ControlDescription,
    NumberControlMeta {
  controlType: ControlTypes.Number;
  type: 'number';
}
