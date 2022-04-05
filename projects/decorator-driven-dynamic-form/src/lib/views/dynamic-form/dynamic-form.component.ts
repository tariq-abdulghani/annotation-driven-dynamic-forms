import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InputTypes } from '../../models/types/inputs/input-types.enum';
import { FormEntityProcessorService } from '../../services/form-entity-processor/form-entity-processor.service';
import { InputNode } from '../../models/types/inputs/input-node';
import { FormValueTransformer } from '../../models/types/forms/form-value-transformer';
import { ActionsPosition } from '../../models/types/forms/form-actions-position';

@Component({
  selector: 'ddd-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  readonly CONTROL_TYPES = InputTypes;
  formDescription!: InputNode;
  @Input('formEntity') formModel!: any;
  @Input('valueTransformer') valueTransformer?: FormValueTransformer<any, any>;
  @Output('submitEvent') submitEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('changeEvent') changEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('buttonClickEvent') buttonClickEvent: EventEmitter<any> =
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
      this.formDescription!.getControl()?.valueChanges.subscribe(
        (value: any) => {
          this.changEvent.emit(value);
        }
      );
    }
  }

  onSubmit(v: any) {
    this.formDescription.getControl()?.markAllAsTouched();
    console.log(this.formDescription.getControl());
    if (this.formDescription.getControl()?.valid) {
      this.submitEvent.emit(this.formValue);
    }
  }

  get actionsPositionClasses() {
    return {
      'justify-content-start':
        this.formDescription.getProperty('actionPositions') ==
        ActionsPosition.NEW_LINE_START,
      'justify-content-end':
        this.formDescription.getProperty('actionPositions') ==
        ActionsPosition.NEW_LINE_END,
      'justify-content-center':
        this.formDescription.getProperty('actionPositions') ==
        ActionsPosition.NEW_LINE_CENTER,
    };
  }

  get actionsWithGridFlow() {
    return (
      this.formDescription.getProperty('actionPositions') ==
      ActionsPosition.GRID_FLOW
    );
  }

  onClick(action: any) {
    if (action.type == 'button') {
      this.buttonClickEvent.emit({
        actionId: action.id,
        formValue: this.formValue,
      });
    }
  }

  get formValue() {
    return this.valueTransformer
      ? this.valueTransformer.transform(this.formDescription.getControl().value)
      : this.formDescription.getControl().value;
  }
}
