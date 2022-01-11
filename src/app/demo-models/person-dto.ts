import { of } from 'rxjs';
import { Address } from './address-dto';

import {
  TextControl,
  NumberControl,
} from '../decorator-driven-dynamic-forms/models/decorators/common-controls';
import { SelectControl } from '../decorator-driven-dynamic-forms/models/decorators/select-control';
import { SplittedDateRangeControl } from '../decorator-driven-dynamic-forms/models/decorators/splitted-date-range/splitted-date-range';
import { FormModel } from '../decorator-driven-dynamic-forms/models/decorators/form-model';
import { NestedFormModel } from '../decorator-driven-dynamic-forms/models/decorators/nested-form-model';
import { ContactInfo } from './contact-info';
import {
  Max,
  MaxLength,
  Min,
  MinLength,
  NotNull,
  Pattern,
} from '../decorator-driven-dynamic-forms/models/decorators/validation/common-validators';
import {
  Reset,
  Submit,
} from '../decorator-driven-dynamic-forms/models/decorators/actions';

@Reset({ label: 'clear', class: 'btn btn-danger' })
@Submit({ label: 'save', class: 'btn btn-primary' })
@FormModel()
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

  @SplittedDateRangeControl({
    from: new Date(),
    to: new Date(2030, 10, 10),
    startDate: {
      id: 'date-of-birth',
      name: 'dateOfBirth',
      placeHolder: 'yyyy/mm/dd',
      label: 'birth date',
    },
    endDate: {
      id: 'date-of-death',
      name: 'dateOfDeath',
      placeHolder: 'yyyy/mm/dd',
      label: 'quietus date',
    },
    optional: true,
  })
  dates!: [Date | null | string, Date | null | string]; //= [new Date(), new Date()];

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

  @NestedFormModel({ name: 'contactInfo', classDeclaration: ContactInfo })
  contactInfo: ContactInfo = {
    telA: '012-3458',
    telB: '015-1425',
    address: { city: 'city wow', state: 'state wow', zipCode: '1234' },
  };

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.dates = [null, null]; // [new Date(), new Date()]; ////[new Date(), new Date()]
    this.gender = { label: 'male', value: 'male' };
    this.password = '123456';
    this.post = null;
  }
}
