import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlTypes } from './models/control-types.enum';
import { FormLayout } from './models/form-layout-enum';
import {
  FormDescriptor,
  FormEntityProcessor,
} from './models/formEntityProcessor';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  readonly CONTROL_TYPES = ControlTypes;
  readonly FORM_LAYOUT_OPTS = FormLayout;
  formDescriptor!: FormDescriptor;
  @Input('formModel') formModel!: any;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formModel) {
      this.formModel = changes.formModel.currentValue;
      this.formDescriptor = FormEntityProcessor.generateFormDescriptor(
        this.formModel
      );
      // console.log(this.formDescriptor);
      // console.log(this.formModel);
    }
  }

  onSubmit(v: any) {
    console.log(this.formDescriptor.formGroup);
  }
}
