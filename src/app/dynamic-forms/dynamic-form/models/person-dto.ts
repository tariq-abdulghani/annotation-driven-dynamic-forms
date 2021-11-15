import { Validators } from "@angular/forms";
import { formModel, numberControl, textControl } from "./controls-meta";
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
    validators: [Validators.required],
  })
  name: string;

  @numberControl({
    name: 'age',
    type: 'number',
    validators: [Validators.required],
  })
  age: number;

  @splittedDateRangeControl({
    startDate: new Date(),
    startDateLabel:"dateOfBirth",
    endDate: new Date(2030, 10, 10),
    endDateLabel: "dateOfDeath",
    optional: false
  })
  dates!:[Date | null | string, Date | null | string] //= [new Date(), new Date()];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.dates = [null, null];// [new Date(), new Date()]; ////[new Date(), new Date()]
  }
}