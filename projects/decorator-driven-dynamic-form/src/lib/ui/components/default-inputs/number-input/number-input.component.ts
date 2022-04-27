import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'number' })
@Component({
  selector: 'lib-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
})
export class NumberInputComponent extends InputComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
