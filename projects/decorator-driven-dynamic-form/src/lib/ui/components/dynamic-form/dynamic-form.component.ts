import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValueTransformer } from '../../../core/models/types/forms/form-value-transformer';
import { InputNode } from '../../../core/models/types/inputs/input-node';
import { EntityRegistry } from '../../../core/services/entity-registry/entity-registry.service';
import { DynamicFormContextService } from '../../../core/services/form-context/dynamic-form-context.service';
import { FormEntityProcessorService } from '../../../core/services/form-entity-processor/form-entity-processor.service';
import { ButtonTemplateDirective } from '../../directives/button-template/button-template.directive';
import { InputTemplateDirective } from '../../directives/input-template/input-template.directive';
import {UseContext} from "../../../core/models/decorators/context/form-context";
import {FormController} from "../../../core/models/types/inputs/form-controller";

@Component({
  selector: 'd-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [DynamicFormContextService],
})
export class DynamicFormComponent
  implements OnInit, AfterContentInit, FormController
{
  inputTree!: InputNode;
  formEntity!: any;
  @Input('entityName') entityName!: string;
  @Input('initialValue') initialValue!: any;
  @Input('useContext') useContext!: UseContext;
  @Input('valueTransformer')
  valueTransformer?: FormValueTransformer<any, any>;
  @Input('includeDisabled') includeDisabled = false;
  @Output('submitEvent') submitEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('changeEvent') changEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('buttonClickEvent') buttonClickEvent: EventEmitter<any> =
    new EventEmitter<any>();

  @ContentChildren(InputTemplateDirective)
  inputTemplateQueryList!: QueryList<InputTemplateDirective>;

  @ContentChildren(ButtonTemplateDirective)
  buttonTemplateQueryList!: QueryList<ButtonTemplateDirective>;
  public inputTemplateMap = new Map<string, TemplateRef<any>>();
  constructor(
    private formEntityProcessorService: FormEntityProcessorService,
    private dynamicFormContextService: DynamicFormContextService,
    private entityRegistry: EntityRegistry
  ) {}

  ngAfterContentInit(): void {
    console.log('buttonTemplateQueryList', this.buttonTemplateQueryList);
    this.inputTemplateQueryList.forEach((item) => {
      this.inputTemplateMap.set(item.getInputType(), item.getTemplateRef());
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entityName) {
      const entityClass = this.entityRegistry.get(
        changes.entityName.currentValue
      );
      if (entityClass) {
        this.formEntity = new entityClass();
        this.inputTree = this.formEntityProcessorService.process(
          this.formEntity,
          this.useContext
        );
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

        this.applySort(this.inputTree);
      }
    }
    if (changes.initialValue && changes.initialValue.firstChange) {
      let value = changes.initialValue.currentValue;
      this.inputTree.getControl().reset(value, { emitEvent: false });
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
    } else if (typeof action == 'string') {
      this.buttonClickEvent.emit({
        actionId: action,
        formValue: this.formValue,
      });
    }
  }

  get formValue() {
    if(this.includeDisabled){
      return this.valueTransformer
        ? this.valueTransformer.transform((this.inputTree.getControl() as FormGroup).getRawValue())
        : (this.inputTree.getControl() as FormGroup).getRawValue();
    }else{
      return this.valueTransformer
        ? this.valueTransformer.transform(this.inputTree.getControl().value)
        : this.inputTree.getControl().value;
    }

  }

  applySort(inputNode: InputNode) {
    if (inputNode.getChildren() == null) {
      return;
    } else {
      inputNode
        .getChildren()
        ?.sort((a, b) => a.getProperty('order') - b.getProperty('order'));
      inputNode.getChildren()?.forEach((child) => this.applySort(child));
    }
  }

  markAllAsTouched(): void {
    this.inputTree.getControl()?.markAllAsTouched();
  }
  markAsTouched(path: string): void {
    throw new Error('Method not implemented.');
  }
  markAsInvalid(
    path?: string,
    errConfig?: { errName: string; errMessage: string }
  ): void {
    throw new Error('Method not implemented.');
  }
  markFieldAsInvalid(
    path: string,
    errConfig: { errName: string; errMessage: string }
  ): void {
    throw new Error('Method not implemented.');
  }
  disable(path: string): void {
    throw new Error('Method not implemented.');
  }
  enable(path: string): void {
    throw new Error('Method not implemented.');
  }
  setReadonly(path: string): void {
    throw new Error('Method not implemented.');
  }
  unsetReadonly(path: string): void {
    throw new Error('Method not implemented.');
  }
  getRowValue() {
    return (this.inputTree.getControl() as FormGroup).getRawValue();
  }
  getValue() {
    return (this.inputTree.getControl() as FormGroup).value;
  }
  fireAction(id: string): void {
    throw new Error('Method not implemented.');
  }
  reset(value?: any, emitEvent?: boolean): void {
    this.inputTree.getControl().reset(value || {}, { emitEvent: emitEvent });
  }
  patch(value?: any, emitEvent?: boolean): void{
    this.inputTree.getControl().reset({...this.inputTree.getControl().value, ...value}, { emitEvent: emitEvent });
  }
  getName(): string {
    return this.entityName;
  }

  isValid(): boolean {
    return this.inputTree.getControl().valid;
  }
}
