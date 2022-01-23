import { ControlTypes } from '../control-types.enum';
import { ControlDescription } from './control-description';
import { DateControlMeta } from './controls-meta';

export interface DateControlDescription
  extends ControlDescription,
    DateControlMeta {
  controlType: ControlTypes.Date;
  type: 'date';
}
