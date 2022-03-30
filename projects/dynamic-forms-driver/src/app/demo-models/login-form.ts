import {
  MaxLength,
  MinLength,
  NotNull,
  TextControl,
  Pattern,
  Reset,
  Submit,
  SelectControl,
  RadioButtons,
  NestedFormEntity,
  FormEntity,
  RequiredTrue,
  Max,
  Min,
  DateControl,
  NumberControl,
  CheckboxControl,
} from 'decorator-driven-dynamic-form';

import { Address } from './address-dto';

@Reset({ label: 'clear', class: 'btn btn-danger' })
@Submit({ label: 'save', class: 'btn btn-primary' })
@FormEntity()
export class LoginForm {
  @MaxLength({ maxlength: 20, message: 'max length 20' })
  @MinLength({ minlength: 3, message: 'min length 3' })
  @NotNull({ message: 'user name is required!' })
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    label: 'user name',
    placeHolder: 'example ...',
  })
  name: string | null = null;

  @NotNull({ message: 'password is required!' })
  @Pattern({
    pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message:
      'password must be 8 letters at least, and contains uppercase and special character and alphanumeric',
  })
  @TextControl({
    name: 'password',
    type: 'password',
    id: 'password',
  })
  password: string | null = null;

  @Max({ maxValue: 100, message: 'age cant be more than ${max} years' })
  @Min({ minValue: 7, message: 'age cant be lass than ${min}' })
  @NotNull({ message: 'age is required' })
  @NumberControl({
    id: 'age1',
    name: 'age',
    label: 'age',
    enableFn: (f: any) => f.payment.id == 'v',
  })
  age = 30;

  @DateControl({
    id: 'expiryDate',
    name: 'expiryDate',
    label: 'Expiry Date',
    // readonly: true,
  })
  expiryDate: string | null = null;

  @SelectControl({
    id: 'gender',
    name: 'gender',
    label: 'gender',
    dataSource: [
      { label: 'male', id: 'm' },
      { label: 'female', id: 'f' },
    ],
    bindLabel: 'label',
    bindValue: null,
    compareWith: (a, b) => (a && b ? a.id == b.id : false),
  })
  gender = null;

  @RequiredTrue({ message: 'must be true' })
  @CheckboxControl({
    name: 'employee',
    id: 'employee',
    label: 'Employee',
    enableFn: (f: any) => f.payment.id == 'v',
  })
  employee = true;

  @RadioButtons({
    id: 'payment',
    name: 'payment',
    legend: 'Payment',
    dataSource: [
      { key: 'visa', id: 'v' },
      { key: 'cash', id: 'c' },
    ],
    bindLabel: 'key',
    bindValue: 'id',
  })
  payment = { key: 'visa', id: 'v' };

  @NestedFormEntity({
    name: 'address',
    classDeclaration: Address,
    legend: 'Address',
  })
  address: Address | null = null;
}
