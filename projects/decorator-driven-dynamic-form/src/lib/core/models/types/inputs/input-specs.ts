import { Observable } from 'rxjs';
import { InputTypes } from './input-types.enum';

type Width = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface InputSpec {
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: Width;
  class?: string;
  enableFn?: (formValue: any) => boolean;
  readonly?: boolean;
  hint?: string;
  order?: number;
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
  defaultValueIndex?: number;
}

export interface CheckInputSpec extends InputSpec {}

export interface RadioButtonsSpec extends InputSpec {
  legend: string;
  bindLabel: string;
  bindValue: string | null;
  dataSource: URL | any[] | Observable<any[]>;
}

export interface CustomInputSpec extends InputSpec {
  inputType: string;
}
