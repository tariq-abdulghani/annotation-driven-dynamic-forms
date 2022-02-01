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
import { FormDescription } from '../../models/types/forms-meta/FormDescription';
import {FormEntityProcessorService} from "../../services/form-entity-processor/form-entity-processor.service";

@Component({
  selector: 'ddd-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  readonly CONTROL_TYPES = ControlTypes;
  readonly FORM_LAYOUT_OPTS = FormLayout;
  formDescriptor!: FormDescription;
  @Input('formEntity') formModel!: any;
  @Output('submitEvent') submitEvent: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(private formEntityProcessorService: FormEntityProcessorService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formModel) {
      this.formModel = changes.formModel.currentValue;
      this.formDescriptor = this.formEntityProcessorService.process(this.formModel);
      console.log(this.formDescriptor);
    }
  }

  onSubmit(v: any) {
    this.formDescriptor.formGroup.markAllAsTouched();
    console.log(this.formDescriptor.formGroup);
    if (this.formDescriptor.formGroup.valid) {
      this.submitEvent.emit(this.formDescriptor.formGroup.value);
    }
  }
}
