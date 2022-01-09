import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Address } from './address-dto';

import { TextControl, NumberControl } from './decorators/common-controls';
import { FormLayout } from './types/form-layout-enum';
import { SelectControl } from './decorators/select-control';
import { SplittedDateRangeControl } from './decorators/splitted-date-range';
import { FormModel } from './decorators/form-model';
import { NestedFormModel } from './decorators/nested-form-model';
import { ContactInfo } from './types/contact-info';

@FormModel({
  showReset: true,
  submitBtnLabel: 'Sign Up',
  resetBtnLabel: 'reset',
  formLayout: FormLayout.SINGLE_COLUMN,
})
export class PersonForm {
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    label: 'user name',
    placeHolder: 'example ...',
    validators: [Validators.required],
  })
  name: string;

  @TextControl({
    name: 'password',
    type: 'password',
    id: 'password',
    validators: [Validators.required],
  })
  password!: string | null;

  @SplittedDateRangeControl({
    startDateInputId: 'date-of-birth',
    startDateInputPlaceHolder: 'yyyy/mm/dd',
    startDateInputName: 'dateOfBirth',
    startDateInputLabel: 'birth date',
    rangeStartDate: new Date(),
    rangeEndDate: new Date(2030, 10, 10),
    endDateInputName: 'dateOfDeath',
    endDateInputId: 'date-of-death',
    endDateInputPlaceHolder: 'yyyy/mm/dd',
    endDateInputLabel: 'quietus date',
    optional: true,
  })
  dates!: [Date | null | string, Date | null | string]; //= [new Date(), new Date()];

  @NumberControl({
    name: 'age',
    id: 'age',
    placeHolder: 'example ...',
    validators: [Validators.required],
  })
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
    validators: [Validators.required],
  })
  gender: { label: string; value: string };

  @SelectControl({
    name: 'post',
    id: 'post',
    bindLabel: 'title',
    compareWith: (a: any, b: any) => (a && b ? a.id == b.id : false),
    dataSource: new URL('https://jsonplaceholder.typicode.com/posts'),
    bindValue: null,
    multiple: undefined,
    validators: [Validators.required],
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
