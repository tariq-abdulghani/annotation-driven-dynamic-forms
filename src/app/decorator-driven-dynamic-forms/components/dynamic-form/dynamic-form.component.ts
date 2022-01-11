import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlTypes } from '../../models/types/control-types.enum';
import { FormLayout } from '../../models/types/form-layout-enum';
import { FormDescriptor } from '../../models/types/controls-descriptors.ts';
import { FormEntityProcessor } from '../../utils/form-entity-processor';

@Component({
  selector: 'dd-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  readonly CONTROL_TYPES = ControlTypes;
  readonly FORM_LAYOUT_OPTS = FormLayout;
  formDescriptor!: FormDescriptor;
  @Input('formModel') formModel!: any;
  @Output('submitEvent') submitEvent: EventEmitter<any> =
    new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formModel) {
      this.formModel = changes.formModel.currentValue;
      this.formDescriptor = FormEntityProcessor.generateFormDescriptor(
        this.formModel
      );
      console.log(this.formDescriptor);
      // console.log(this.formModel);
    }
  }

  onSubmit(v: any) {
    this.formDescriptor.formGroup.markAllAsTouched();
    // console.log(this.formDescriptor.formGroup);
    if (this.formDescriptor.formGroup.valid) {
      this.submitEvent.emit(this.formDescriptor.formGroup.value);
    }
  }
}
