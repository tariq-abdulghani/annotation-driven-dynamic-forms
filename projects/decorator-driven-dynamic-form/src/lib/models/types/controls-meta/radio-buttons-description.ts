import { ControlTypes } from '../control-types.enum';
import { ControlDescription } from './control-description';
import { RadioButtonsMeta } from './controls-meta';

export interface RadioButtonsDescription
  extends ControlDescription,
    RadioButtonsMeta {
  controlType: ControlTypes.RadioButtons;
}
