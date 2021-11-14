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
    startDateLabel:"dateOfBirth",
    startDate: new Date(),
    endDate: new Date(2060, 10, 10),
    endDateLabel: "dateOfDeath"
  })
  dates = [new Date(), new Date()];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.dates = [new Date(), new Date()]
  }
}