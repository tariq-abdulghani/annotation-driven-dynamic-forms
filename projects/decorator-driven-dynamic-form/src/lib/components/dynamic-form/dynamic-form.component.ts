import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InputTypes } from '../../models/types/inputs-meta/input-types.enum';
import { Layout } from '../../models/types/forms-meta/form-layout-enum';
import { FormEntityProcessorService } from '../../services/form-entity-processor/form-entity-processor.service';
import { InputDescription } from '../../models/types/inputs-meta/input-description';
import { FormMeta } from '../../models/types/forms-meta/form-meta';

@Component({
  selector: 'ddd-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  readonly CONTROL_TYPES = InputTypes;
  readonly FORM_LAYOUT_OPTS = Layout;
  formDescription!: InputDescription<FormMeta>;
  @Input('formEntity') formModel!: any;
  @Output('submitEvent') submitEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('changeEvent') changEvent: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(private formEntityProcessorService: FormEntityProcessorService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formModel) {
      this.formModel = changes.formModel.currentValue;
      this.formDescription = this.formEntityProcessorService.process(
        this.formModel
      );
      console.log(this.formDescription);
      this.formDescription!.control?.valueChanges.subscribe((value: any) => {
        this.changEvent.emit(value);
      });
    }
  }

  onSubmit(v: any) {
    this.formDescription.control?.markAllAsTouched();
    console.log(this.formDescription.control);
    if (this.formDescription.control?.valid) {
      this.submitEvent.emit(this.formDescription.control.value);
    }
  }
}
