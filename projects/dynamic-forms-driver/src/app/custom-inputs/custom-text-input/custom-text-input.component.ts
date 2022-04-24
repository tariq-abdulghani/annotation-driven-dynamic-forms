import { Component, OnInit } from '@angular/core';
import { InputComponent } from 'decorator-driven-dynamic-form';
import { DynamicFormInput } from 'decorator-driven-dynamic-form';

// @DynamicFormInput({ inputType: 'composite' })
@Component({
  selector: 'app-custom-text-input',
  templateUrl: './custom-text-input.component.html',
  styleUrls: ['./custom-text-input.component.css'],
})
export class CustomTextInputComponent extends InputComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
