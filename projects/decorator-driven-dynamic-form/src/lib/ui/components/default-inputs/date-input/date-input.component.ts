import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'date' })
@Component({
  selector: 'lib-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent extends InputComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
