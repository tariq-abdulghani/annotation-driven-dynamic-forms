import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActionsPosition } from '../../models/types/forms/form-actions-position';
import { FormValueTransformer } from '../../models/types/forms/form-value-transformer';
import { InputNode } from '../../models/types/inputs/input-node';
import { FormEntityProcessorService } from '../../services/form-entity-processor/form-entity-processor.service';

@Component({
  selector: 'ddd-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  inputTree!: InputNode;
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
      this.inputTree = this.formEntityProcessorService.process(this.formModel);
      console.log(this.inputTree);
      this.inputTree!.getControl()?.valueChanges.subscribe((value: any) => {
        this.changEvent.emit(value);
      });
    }
  }

  onSubmit(v: any) {
    this.inputTree.getControl()?.markAllAsTouched();
    console.log(this.inputTree.getControl());
    if (this.inputTree.getControl()?.valid) {
      this.submitEvent.emit(this.formValue);
    }
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
      ? this.valueTransformer.transform(this.inputTree.getControl().value)
      : this.inputTree.getControl().value;
  }

  get actionsPositionClasses() {
    return {
      'justify-content-start':
        this.inputTree.getProperty('actionPositions') ==
        ActionsPosition.NEW_LINE_START,
      'justify-content-end':
        this.inputTree.getProperty('actionPositions') ==
        ActionsPosition.NEW_LINE_END,
      'justify-content-center':
        this.inputTree.getProperty('actionPositions') ==
        ActionsPosition.NEW_LINE_CENTER,
    };
  }

  get actionsWithGridFlow() {
    return (
      this.inputTree.getProperty('actionPositions') == ActionsPosition.GRID_FLOW
    );
  }
}
