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
} from 'decorator-driven-dynamic-form';
import { DateControl } from 'projects/decorator-driven-dynamic-form/src/lib/models/decorators/controls/date-control';
import {
  CheckboxControl,
  NumberControl,
} from 'projects/decorator-driven-dynamic-form/src/public-api';
import { Address } from './address-dto';
import { PaymentMethodsList } from './payment-methods';

@Reset({ label: 'clear', class: 'btn btn-danger' })
@Submit({ label: 'save', class: 'btn btn-primary' })
@FormEntity()
export class LoginForm {
  @NotNull({ message: 'user name is required!' })
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    label: 'user name',
    placeHolder: 'example ...',
  })
  name: string | null = null;

  @TextControl({
    name: 'password',
    type: 'password',
    id: 'password',
  })
  password: string | null = null;

  @NumberControl({
    id: 'age1',
    name: 'age',
    label: 'age',
  })
  age = 30;

  @DateControl({
    id: 'expiryDate',
    name: 'expiryDate',
    label: 'Expiry Date',
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

  @CheckboxControl({
    name: 'employee',
    id: 'employee',
    label: 'Employee',
  })
  employee = true;

  @RadioButtons({
    id: 'payment',
    name: 'payment',
    legend: 'Payment',
    dataSource: PaymentMethodsList,
    bindLabel: 'key',
    bindValue: null,
  })
  payment = { key: 'visa', id: 'v' };

  @NestedFormEntity({ name: 'address', classDeclaration: Address })
  address: Address | null = null;
}
