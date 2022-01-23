import { FormControl } from '@angular/forms';
import { ControlTypes } from '../control-types.enum';
import {
  CheckboxMeta,
  DateControlMeta,
  NumberControlMeta,
  RadioButtonsMeta,
  SelectControlMeta,
  TextControlMeta,
} from './controls-meta';
import { RadioButtonsDescription } from './radio-buttons-description';
import { CheckboxDescription } from './checkbox-description';
import { SelectControlDescription } from './select-control-description';
import { NumberControlDescription } from './number-control-description';
import { TextControlDescription } from './text-control-description';
import { DateControlDescription } from './date-control-description';

export class Descriptions_dep {
  public static text(
    textControlMeta: TextControlMeta,
    propertyKey: string
  ): TextControlDescription {
    return {
      ...(!textControlMeta.width && { width: 6 }),
      ...textControlMeta,
      controlType: ControlTypes.Text,
      propertyKey: propertyKey,
    } as TextControlDescription;
  }

  public static number(
    number: NumberControlMeta,
    propertyKey: string
  ): NumberControlDescription {
    return {
      ...(!number.width && { width: 6 }),
      ...number,
      controlType: ControlTypes.Number,
      //@ts-ignore
      formControl: null,
      propertyKey: propertyKey,
      type: 'number',
    };
  }

  public static select(
    selectMeta: SelectControlMeta,
    propertyKey: string
  ): SelectControlDescription {
    return {
      ...(!selectMeta.width && { width: 6 }),
      ...selectMeta,
      controlType: ControlTypes.Select,
      formControl: new FormControl(null, selectMeta.validators),
      propertyKey: propertyKey,
    };
  }

  public static date(
    dateControlMeta: DateControlMeta,
    propertyKey: string
  ): DateControlDescription {
    return {
      ...(!dateControlMeta.width && { width: 6 }),
      ...dateControlMeta,
      propertyKey: propertyKey,
      formControl: new FormControl(null, dateControlMeta.validators),
      type: 'date',
      controlType: ControlTypes.Date,
    };
  }

  public static checkbox(
    checkboxMeta: CheckboxMeta,
    propertyKey: string
  ): CheckboxDescription {
    return {
      ...(!checkboxMeta.width && { width: 12 }),
      ...checkboxMeta,
      propertyKey: propertyKey,
      formControl: new FormControl(null),
      type: 'checkbox',
      controlType: ControlTypes.Checkbox,
    };
  }

  public static radioButtons(
    radioMeta: RadioButtonsMeta,
    propertyKey: string
  ): RadioButtonsDescription {
    return {
      ...(!radioMeta.width && { width: 12 }),
      ...radioMeta,
      propertyKey: propertyKey,
      formControl: new FormControl(null),
      type: 'radio',
      controlType: ControlTypes.RadioButtons,
    };
  }
}
