import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { DataLoaderService } from '../../../services/data-loader/data-loader.service';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'radio_buttons' })
@Component({
  selector: 'lib-radio-buttons-input',
  templateUrl: './radio-buttons-input.component.html',
  styleUrls: ['./radio-buttons-input.component.css'],
  providers: [DataLoaderService],
})
export class RadioButtonsInputComponent
  extends InputComponent
  implements OnInit
{
  constructor(public dataLoader: DataLoaderService) {
    super();
  }

  ngOnInit(): void {}
}
