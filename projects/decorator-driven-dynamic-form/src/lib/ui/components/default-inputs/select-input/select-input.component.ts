import { Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../../input-component-registry/decorators/dynamic-form-input';
import { DataLoaderService } from '../../../services/data-loader/data-loader.service';
import { InputComponent } from '../../input/input.component';
import { AsyncPipe } from '@angular/common';

@DynamicFormInput({ inputType: 'select' })
@Component({
  selector: 'lib-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [DataLoaderService],
})
export class SelectInputComponent extends InputComponent implements OnInit {
  options!: any[];
  defaultValueIndex: number | undefined;
  defaultValue: any;

  constructor(public dataLoader: DataLoaderService) {
    super();
  }

  ngOnInit(): void {
    this.defaultValueIndex =
      this.getInputNode().getProperty('defaultValueIndex');

    this.dataLoader
      .load(this.getInputNode().getProperty('dataSource'))
      .toPromise()
      .then((data) => {
        this.options = data;
        if (this.defaultValueIndex !== undefined) {
          this.defaultValue = this.options[this.defaultValueIndex];
          this.getInputNode().getControl().setValue(this.defaultValue, false);
        }
      });
  }
}
