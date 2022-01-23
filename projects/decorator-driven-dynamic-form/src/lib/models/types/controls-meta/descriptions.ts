import { ControlTypes } from '../control-types.enum';
import { UnboundControlDescription } from './unbound-control-description';
import {
  TextControlMeta,
  NumberControlMeta,
  SelectControlMeta,
  DateControlMeta,
  CheckboxMeta,
  RadioButtonsMeta,
} from './controls-meta';
import { FormControl } from '@angular/forms';
import { ControlDescription } from './control-description';

export class ControlsDescription {
  public static text(
    textControlMeta: TextControlMeta,
    propertyKey: string
  ): UnboundControlDescription {
    return {
      ...(!textControlMeta.width && { width: 6 }),
      ...textControlMeta,
      controlType: ControlTypes.Text,
      propertyKey: propertyKey,
      validators: [],
      formControl: null,
      errorMap: new Map(),
    };
  }

  public static number(
    number: NumberControlMeta,
    propertyKey: string
  ): UnboundControlDescription {
    return {
      ...(!number.width && { width: 6 }),
      ...number,
      controlType: ControlTypes.Number,
      validators: [],
      formControl: null,
      errorMap: new Map(),
      propertyKey: propertyKey,
      type: 'number',
    };
  }

  public static select(
    selectMeta: SelectControlMeta,
    propertyKey: string
  ): UnboundControlDescription {
    return {
      ...(!selectMeta.width && { width: 6 }),
      ...selectMeta,
      controlType: ControlTypes.Select,
      validators: [],
      formControl: null,
      errorMap: new Map(),
      propertyKey: propertyKey,
    };
  }

  public static date(
    dateControlMeta: DateControlMeta,
    propertyKey: string
  ): UnboundControlDescription {
    return {
      ...(!dateControlMeta.width && { width: 6 }),
      ...dateControlMeta,
      propertyKey: propertyKey,
      validators: [],
      formControl: null,
      errorMap: new Map(),
      type: 'date',
      controlType: ControlTypes.Date,
    };
  }

  public static checkbox(
    checkboxMeta: CheckboxMeta,
    propertyKey: string
  ): UnboundControlDescription {
    return {
      ...(!checkboxMeta.width && { width: 12 }),
      ...checkboxMeta,
      propertyKey: propertyKey,
      validators: [],
      formControl: null,
      errorMap: new Map(),
      type: 'checkbox',
      controlType: ControlTypes.Checkbox,
    };
  }

  public static radioButtons(
    radioMeta: RadioButtonsMeta,
    propertyKey: string
  ): UnboundControlDescription {
    return {
      ...(!radioMeta.width && { width: 12 }),
      ...radioMeta,
      propertyKey: propertyKey,
      validators: [],
      formControl: null,
      errorMap: new Map(),
      type: 'radio',
      controlType: ControlTypes.RadioButtons,
    };
  }

  public static cloneAndBind(
    unbound: UnboundControlDescription,
    formControl: FormControl
  ): ControlDescription {
    return { ...unbound, formControl: formControl };
  }
}
