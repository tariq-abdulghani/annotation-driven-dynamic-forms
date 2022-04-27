import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { DataLoaderService } from '../../../services/data-loader/data-loader.service';
import { InputComponent } from '../../input/input.component';

@DynamicFormInput({ inputType: 'select' })
@Component({
  selector: 'lib-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [DataLoaderService],
})
export class SelectInputComponent extends InputComponent implements OnInit {
  constructor(public dataLoader: DataLoaderService) {
    super();
  }

  ngOnInit(): void {}
}
