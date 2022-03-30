import { Observable } from 'rxjs';
import { InputTypes } from './input-types.enum';
import { InputDescription } from './input-description';

export interface InputSpec {
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: number;
  style?: string;
  class?: string;
  enableFn?: (formValue: any) => boolean;
  readonly?: boolean;
  hint?: string;
  [x: string]: any;
}

export interface TextInputSpec extends InputSpec {
  type: 'text' | 'password' | 'email' | 'url' | 'tel';
}

export interface DateInputSpec extends InputSpec {
  type: 'date' | 'month' | 'week' | 'datetime-local';
}

export interface NumberInputSpec extends InputSpec {}

export interface SelectInputSpec extends InputSpec {
  bindLabel: string;
  bindValue: string | null;
  compareWith: (a: any, b: any) => boolean;
  dataSource: URL | any[] | Observable<any[]>;
}

export interface CheckInputSpec extends InputSpec {}

export interface RadioButtonsSpec extends InputSpec {
  legend: string;
  bindLabel: string;
  bindValue: string | null;
  dataSource: URL | any[] | Observable<any[]>;
}

export class TextInputDescription extends InputDescription<InputSpec> {
  /**
   *
   */
  constructor(meta: TextInputSpec) {
    super(meta, InputTypes.TEXT);
  }
}

export class NumberInputDescription extends InputDescription<InputSpec> {
  /**
   *
   */
  constructor(meta: NumberInputSpec) {
    meta.type = 'number';
    super(meta, InputTypes.NUMBER);
  }
}

export class DateInputDescription extends InputDescription<InputSpec> {
  /**
   *
   */
  constructor(meta: DateInputSpec) {
    super(meta, InputTypes.DATE);
  }
}

export class SelectInputDescription extends InputDescription<SelectInputSpec> {
  /**
   *
   */
  constructor(meta: SelectInputSpec) {
    super(meta, InputTypes.SELECT);
  }
}

export class CheckboxInputDescription extends InputDescription<CheckInputSpec> {
  /**
   *
   */
  constructor(meta: CheckInputSpec) {
    super(meta, InputTypes.CHECKBOX);
  }
}

export class RadioButtonsInputDescription extends InputDescription<RadioButtonsSpec> {
  /**
   *
   */
  constructor(meta: RadioButtonsSpec) {
    super(meta, InputTypes.RADIO_BUTTONS);
  }
}
