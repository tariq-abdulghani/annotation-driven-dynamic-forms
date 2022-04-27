import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'TEXT' })
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
