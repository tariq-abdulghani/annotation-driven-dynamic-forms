import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlTypes } from '../../models/types/control-types.enum';
import { FormLayout } from '../../models/types/form-layout-enum';
import { FormDescriptor } from '../../models/types/controls-descriptors.ts';
import { FormEntityProcessor } from '../../utils/form-entity-processor';

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
    // default behavior is to validate on submit so i mark all form groups as touched
    this.formDescriptor.formGroup.markAllAsTouched();
    console.log(this.formDescriptor.formGroup);
  }
}
