import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'COMPOSITE' })
@Component({
  selector: 'lib-nested-form',
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.css'],
})
export class NestedFormComponent extends InputComponent implements OnInit {
  templateMap = new Map();
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
