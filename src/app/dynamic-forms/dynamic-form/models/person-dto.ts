import { Validators } from '@angular/forms';
import { formModel as FormModel, textControl as TextControl, numberControl as NumberControl } from './common-controls';
import { splittedDateRangeControl as SplittedDateRangeControl } from './splitted-date-range';

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

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.dates = [null, null]; // [new Date(), new Date()]; ////[new Date(), new Date()]
  }
}
