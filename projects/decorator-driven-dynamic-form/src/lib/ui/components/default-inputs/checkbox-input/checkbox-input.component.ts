import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'checkbox' })
@Component({
  selector: 'lib-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent extends InputComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
