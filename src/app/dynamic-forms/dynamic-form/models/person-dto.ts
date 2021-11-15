import { Validators } from "@angular/forms";
import { formModel, textControl, numberControl } from "./common-controls";
import { splittedDateRangeControl } from "./splitted-date-range";

@formModel({
  showReset: false,
  submitBtnLabel: 'submit',
  resetBtnLabel: 'reset',
})
export class PersonForm {

  @textControl({
    name: 'fullName',
    type: 'text',
    id:'full-name',
    validators: [Validators.required],
  })
  name: string;

  @numberControl({
    name: 'age',
    type: 'number',
    id: 'age',
    validators: [Validators.required],
  })
  age: number;

  @splittedDateRangeControl({
    startDateControlId: 'date-of-birth',
    startDateControlPlaceHolder: 'yyyy/mm-dd',
    rangeStartDate: new Date(),
    startDateControlName:"dateOfBirth",
    rangeEndDate: new Date(2030, 10, 10),
    endDateControlName: "dateOfDeath",
    endDateControlId:'date-of-death',
    endDateControlPlaceHolder: 'yyyy/mm/dd',
    optional: true
  })
  dates!:[Date | null | string, Date | null | string] //= [new Date(), new Date()];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.dates = [null, null];// [new Date(), new Date()]; ////[new Date(), new Date()]
  }
}