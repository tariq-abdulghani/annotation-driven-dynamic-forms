import { Observable } from 'rxjs';

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
  inputWidth?: number;
}

