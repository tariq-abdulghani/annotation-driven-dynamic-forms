import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ControlTypes } from './control-types.enum';
import {
  CheckboxMeta,
  ControlMetaData,
  DateControlMeta,
  NumberControlMeta,
  RadioButtonsMeta,
  SelectControlMeta,
  TextControlMeta,
} from './controls-meta/controls-meta';
import { FormLayout } from './form-layout-enum';
import { BasicActionMeta } from './actions-api';

export interface UnboundControlDescriptor extends ControlMetaData {
  controlType: ControlTypes;
  propertyKey: string;
  formControl: null;
  errorMap: Map<string, string>;
  validators: ValidatorFn[];
}

export interface ControlDescriptor extends ControlMetaData {
  controlType: ControlTypes;
  propertyKey: string;
  formControl: FormControl;
  errorMap?: Map<string, string>;
}

export interface InitializedControlDescriptor extends ControlMetaData {
  controlType: ControlTypes;
  propertyKey: string;
  formControl: FormControl;
  errorMap: Map<string, string>;
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

//@ts-ignore
export interface CheckboxDescriptor extends ControlDescriptor, CheckboxMeta {
  controlType: ControlTypes.Checkbox;
  type: 'checkbox';
}

export interface RadioButtonsDescriptor
  extends ControlDescriptor,
    RadioButtonsMeta {
  controlType: ControlTypes.RadioButtons;
}

export class FormDescriptor {
  formLayout: string = FormLayout.GRID;
  controlsDescriptor: (ControlDescriptor & NestedFormDescriptor)[] = [];
  formGroup!: FormGroup;
  submit: BasicActionMeta = { label: 'submit', class: 'btn btn-primary' };
  reset: BasicActionMeta | null = null;
  smartSetter: (value: any) => void = () => {};
  isGrid = () => {
    return this.formLayout == FormLayout.GRID;
  };
}

export class NestedFormDescriptor {
  name: string = '';
  controlType = ControlTypes.Composite;
  formLayout: string = FormLayout.GRID;
  controlsDescriptor: (ControlDescriptor & NestedFormDescriptor)[] = [];
  formGroup!: FormGroup;
  instance: any;
  propertyKey: string = '';
  isGrid = () => {
    return this.formLayout == FormLayout.GRID;
  };
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
      //@ts-ignore
      formControl: null,
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

  public static checkbox(
    checkboxMeta: CheckboxMeta,
    propertyKey: string
  ): CheckboxDescriptor {
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
  ): RadioButtonsDescriptor {
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
