import {
  Reset,
  Submit,
  FormEntity,
  MaxLength,
  MinLength,
  NotNull,
  TextControl,
  Pattern,
  Max,
  Min,
  NumberControl,
  SelectControl,
  NestedFormEntity,
  RequiredTrue,
  CheckboxControl,
  RadioButtonsControl,
} from 'decorator-driven-dynamic-form';
import { of } from 'rxjs';
import { ContactInfo } from './contact-info';

@Reset({ label: 'clear', class: 'btn btn-danger' })
@Submit({ label: 'save', class: 'btn btn-primary' })
@FormEntity()
export class PersonForm {
  @MaxLength({
    maxlength: 10,
    message: 'name cant be larger than  ${requiredLength} characters',
  })
  @MinLength({
    minlength: 3,
    message: 'user name cant be less than ${requiredLength} characters ',
  })
  @NotNull({ message: 'user name is required!' })
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    label: 'user name',
    placeHolder: 'example ...',
  })
  name: string;

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
  password!: string | null;

  @Max({ maxValue: 100, message: 'age cant be more than ${max} years' })
  @Min({ minValue: 7, message: 'age cant be lass than ${min}' })
  @NotNull({ message: 'age is required' })
  @NumberControl({ name: 'age', id: 'age', placeHolder: 'example ...' })
  age: number;

  @SelectControl({
    name: 'gender',
    id: 'gender',
    bindLabel: 'label',
    compareWith: (a: any, b: any) => (a && b ? a.label == b.label : false),
    dataSource: of([
      { label: 'female', value: 'female' },
      { label: 'male', value: 'male' },
    ]),
    bindValue: null,
    multiple: undefined,
  })
  gender: { label: string; value: string };

  @NotNull({ message: 'please select a post' })
  @SelectControl({
    name: 'post',
    id: 'post',
    bindLabel: 'title',
    compareWith: (a: any, b: any) => (a && b ? a.id == b.id : false),
    dataSource: new URL('https://jsonplaceholder.typicode.com/posts'),
    bindValue: null,
    multiple: undefined,
    label: 'users post',
  })
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  } | null;

  // @NestedFormModel({ name: 'address', classDeclaration: Address })
  // address: Address = new Address('FGH', 'NBH', '4578'); //{ city: 'city wow', state: 'state wow', zipCode: '1234' };

  // @NestedFormEntity({ name: 'contactInfo', classDeclaration: ContactInfo })
  // contactInfo: ContactInfo = {
  //   telA: '012-3458',
  //   telB: '015-1425',
  //   email: '',
  //   address: { city: 'city wow', state: 'state wow', zipCode: '1234' },
  // };

  @RequiredTrue({ message: 'is required! to be true' })
  @CheckboxControl({ id: 'married', name: 'married', label: 'married' })
  married!: boolean;

  @CheckboxControl({ id: 'employed', name: 'employed', label: 'employed' })
  employed!: boolean;

  @RadioButtonsControl({
    id: 'radios',
    name: 'paymentMethod',
    legend: 'payment method',
    dataSource: [
      { key: 'visa', value: 'visa' },
      { key: 'cash', value: 'cash' },
    ],
    bindLabel: 'value',
    bindValue: null,
  })
  paymentMethod!: any;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.gender = { label: 'male', value: 'male' };
    this.password = '123456';
    this.post = null;
  }
}
