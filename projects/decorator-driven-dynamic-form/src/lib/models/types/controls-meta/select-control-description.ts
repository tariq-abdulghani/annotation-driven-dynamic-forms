import { ControlTypes } from '../control-types.enum';
import { ControlDescription } from './control-description';
import { SelectControlMeta } from './controls-meta';

export interface SelectControlDescription
  extends ControlDescription,
    SelectControlMeta {
  controlType: ControlTypes.Select;
}
