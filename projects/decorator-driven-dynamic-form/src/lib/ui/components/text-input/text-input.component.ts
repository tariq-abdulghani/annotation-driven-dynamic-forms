import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFormInput } from '../../input-component-registry/decorators/register-input-component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { InputComponent } from '../input/input.component';

@DynamicFormInput({ id: 'TEXT' })
@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent extends InputComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
