import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import {
  FormModel ,
  TextControl ,
  NumberControl ,
} from './common-controls';
import { SelectControl } from './select-control';
import { SplittedDateRangeControl } from './splitted-date-range';

@FormModel({
  showReset: false,
  submitBtnLabel: 'submit',
  resetBtnLabel: 'reset',
})
export class PersonForm {
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    validators: [Validators.required],
  })
  name: string;

  @TextControl({
    name: 'password',
    type: 'password',
    id: 'password',
    validators: [Validators.required],
  })
  password: string | null;

  @NumberControl({
    name: 'age',
    type: 'number',
    id: 'age',
    validators: [Validators.required],
  })
  age: number;

  @SplittedDateRangeControl({
    startDateInputId: 'date-of-birth',
    startDateInputPlaceHolder: 'yyyy/mm/dd',
    startDateInputName: 'dateOfBirth',
    rangeStartDate: new Date(),
    rangeEndDate: new Date(2030, 10, 10),
    endDateInputName: 'dateOfDeath',
    endDateInputId: 'date-of-death',
    endDateInputPlaceHolder: 'yyyy/mm/dd',
    optional: true,
  })
  dates!: [Date | null | string, Date | null | string]; //= [new Date(), new Date()];

  @SelectControl({
    name: 'gender',
    id: 'gender',
    bindLabel: 'label',
    compareWith: (a: any, b: any) => a.label == b.label,
    asyncDataSource: () => of([
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' },
    ]),
    bindValue: null,
    multiple: undefined,
  })
  gender: { label: string; value: string };

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.dates = [null, null]; // [new Date(), new Date()]; ////[new Date(), new Date()]
    this.gender = { label: 'male', value: 'male' };
    this.password = null;
  }
}
