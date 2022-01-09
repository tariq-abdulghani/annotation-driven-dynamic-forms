import { FormControl, FormGroup } from '@angular/forms';
import { ControlTypes } from './control-types.enum';
import {
  ControlMetaData,
  DateControlMeta,
  NumberControlMeta,
  SelectControlMeta,
  TextControlMeta,
} from './controls-meta';
import { FormLayout } from './form-layout-enum';

export interface ControlDescriptor extends ControlMetaData {
  controlType: ControlTypes;
  propertyKey: string;
  formControl: FormControl;
}

export interface TextControlDescriptor
  extends ControlDescriptor,
    TextControlMeta {
  controlType: ControlTypes.Text;
  type: 'text' | 'password' | 'email' | 'url' | 'tel';
}

export interface NumberControlDescriptor
  extends ControlDescriptor,
    NumberControlMeta {
  controlType: ControlTypes.Number;
  type: 'number';
}

export interface DateControlDescriptor
  extends ControlDescriptor,
    DateControlMeta {
  controlType: ControlTypes.Date;
  type: 'date';
}

export interface SelectControlDescriptor
  extends ControlDescriptor,
    SelectControlMeta {
  controlType: ControlTypes.Select;
}

export class FormDescriptor {
  showReset: boolean = false;
  resetBtnLabel: string = 'reset';
  submitBtnLabel: string = 'submit';
  formLayout: string = FormLayout.GRID;
  controlsDescriptor: (ControlDescriptor & NestedFormDescriptor)[] = [];
  formGroup!: FormGroup;
  smartSetter: (value: any) => void = () => {};
}

export class NestedFormDescriptor {
  name: string = '';
  controlType = ControlTypes.Composite;
  formLayout: string = FormLayout.GRID;
  controlsDescriptor: (ControlDescriptor & NestedFormDescriptor)[] = [];
  formGroup!: FormGroup;
  instance: any;
  propertyKey: string = '';
}

export class Descriptors {
  public static text(
    textControlMeta: TextControlMeta,
    propertyKey: string
  ): TextControlDescriptor {
    return {
      ...(!textControlMeta.width && { width: 6 }),
      ...textControlMeta,
      controlType: ControlTypes.Text,
      formControl: new FormControl(null, textControlMeta.validators),
      propertyKey: propertyKey,
    } as TextControlDescriptor;
  }

  public static number(
    number: NumberControlMeta,
    propertyKey: string
  ): NumberControlDescriptor {
    return {
      ...(!number.width && { width: 6 }),
      ...number,
      controlType: ControlTypes.Number,
      formControl: new FormControl(null, number.validators),
      propertyKey: propertyKey,
      type: 'number',
    };
  }

  public static select(
    selectMeta: SelectControlMeta,
    propertyKey: string
  ): SelectControlDescriptor {
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
  ): DateControlDescriptor {
    return {
      ...(!dateControlMeta.width && { width: 6 }),
      ...dateControlMeta,
      propertyKey: propertyKey,
      formControl: new FormControl(null, dateControlMeta.validators),
      type: 'date',
      controlType: ControlTypes.Date,
    };
  }
}
