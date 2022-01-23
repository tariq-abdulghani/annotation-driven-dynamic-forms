import { ControlTypes } from '../control-types.enum';
import { ControlDescription } from './control-description';
import { TextControlMeta } from './controls-meta';

export interface TextControlDescription
  extends ControlDescription,
    TextControlMeta {
  controlType: ControlTypes.Text;
  type: 'text' | 'password' | 'email' | 'url' | 'tel';
}
