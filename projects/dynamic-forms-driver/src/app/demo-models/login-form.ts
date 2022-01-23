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
} from 'decorator-driven-dynamic-form';
import { DateControl } from 'projects/decorator-driven-dynamic-form/src/lib/models/decorators/controls/date-control';
import {
  CheckboxControl,
  NumberControl,
} from 'projects/decorator-driven-dynamic-form/src/public-api';

@Reset({ label: 'clear', class: 'btn btn-danger' })
@Submit({ label: 'save', class: 'btn btn-primary' })
export class LoginForm {
  // @MaxLength({
  //   maxlength: 10,
  //   message: 'name cant be larger than  ${requiredLength} characters',
  // })
  // @MinLength({
  //   minlength: 3,
  //   message: 'user name cant be less than ${requiredLength} characters ',
  // })
  @NotNull({ message: 'user name is required!' })
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    label: 'user name',
    placeHolder: 'example ...',
  })
  name!: string;

  // @NotNull({ message: 'password is required!' })
  // @Pattern({
  //   pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  //   message:
  //     'password must be 8 letters at least, and contains uppercase and special character and alphanumeric',
  // })
  @TextControl({
    name: 'password',
    type: 'password',
    id: 'password',
  })
  password!: string | null;

  @NumberControl({
    id: 'age1',
    name: 'age',
    label: 'age',
  })
  age!: number;

  @DateControl({
    id: 'expiryDate',
    name: 'expiryDate',
    label: 'Expiry Date',
  })
  expiryDate!: string;

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
  gender!: any;

  @CheckboxControl({
    name: 'employee',
    id: 'employee',
    label: 'Employee',
  })
  employee = false;

  @RadioButtons({
    id: 'payment',
    name: 'payment',
    legend: 'Payment',
    dataSource: [
      { key: 'visa', id: 'v' },
      { key: 'cash', id: 'c' },
    ],
    bindLabel: 'key',
    bindValue: null,
  })
  payment!: any;
}
