import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { FormValueTransformer } from '../../../core/models/types/forms/form-value-transformer';
import { InputNode } from '../../../core/models/types/inputs/input-node';
import { DynamicFormContextService } from '../../../core/services/form-context/dynamic-form-context.service';
import { FormEntityProcessorService } from '../../../core/services/form-entity-processor/form-entity-processor.service';
import { InputTemplateDirective } from '../../directives/input-template.directive';

@Component({
  selector: 'ddd-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [DynamicFormContextService],
})
export class DynamicFormComponent implements OnInit, AfterContentInit {
  inputTree!: InputNode;
  @Input('formEntity') formModel!: any;
  @Input('valueTransformer') valueTransformer?: FormValueTransformer<any, any>;
  @Output('submitEvent') submitEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('changeEvent') changEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('buttonClickEvent') buttonClickEvent: EventEmitter<any> =
    new EventEmitter<any>();

  @ContentChildren(InputTemplateDirective)
  inputTemplateQueryList!: QueryList<InputTemplateDirective>;

  public inputTemplateMap = new Map<string, TemplateRef<any>>();
  constructor(
    private formEntityProcessorService: FormEntityProcessorService,
    private dynamicFormContextService: DynamicFormContextService
  ) {}
  ngAfterContentInit(): void {
    this.inputTemplateQueryList.forEach((item) => {
      this.inputTemplateMap.set(item.getInputType(), item.getTemplateRef());
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formModel) {
      this.formModel = changes.formModel.currentValue;
      this.inputTree = this.formEntityProcessorService.process(this.formModel);
      console.log(this.inputTree);
      this.dynamicFormContextService.setContext(
        this.inputTree.getControl().value
      );
      this.inputTree.getControl().valueChanges.subscribe((val) => {
        this.dynamicFormContextService.setContext(val);
      });
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
}
