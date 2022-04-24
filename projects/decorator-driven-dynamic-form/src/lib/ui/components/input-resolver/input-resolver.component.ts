import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  ViewChild,
  ComponentFactoryResolver,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { InputNode } from '../../../core/models/types/inputs/input-node';
import { InputAnchorDirective } from '../../directives/input-anchor/input-anchor.directive';
import { InputComponentRegistry } from '../../input-component-registry/input-components-registry';
import { InputComponent } from '../input/input.component';

@Component({
  selector: '[df-input-resolver]',
  templateUrl: './input-resolver.component.html',
  styleUrls: ['./input-resolver.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputResolverComponent implements OnInit, OnChanges {
  @Input() inputNode!: InputNode;
  @Input() inputTemplatesMap!: Map<string, TemplateRef<any>>;
  @ViewChild(InputAnchorDirective, { static: true })
  inputAnchor!: InputAnchorDirective;
  private inputComponentsRegistry = InputComponentRegistry;
  constructor(private resolver: ComponentFactoryResolver) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    if (!this.getTemplateRef()) {
      this.renderInputComponent();
    }
  }
  getInputNode() {
    return this.inputNode;
  }
  getTemplateRef() {
    return (
      this.inputTemplatesMap.get(this.inputNode.getProperty('inputType')) ||
      null
    );
  }

  getInputComponent() {
    return this.inputComponentsRegistry.get(
      this.inputNode.getProperty('inputType')
    );
  }

  renderInputComponent() {
    const inputComponent = this.getInputComponent();
    if (inputComponent) {
      const viewContainerRef = this.inputAnchor.viewContainerRef;
      viewContainerRef.clear();
      const componentFactoryResolver =
        this.resolver.resolveComponentFactory(inputComponent);
      const componentRef = viewContainerRef.createComponent<InputComponent>(
        componentFactoryResolver
      );
      componentRef.instance.initialize(this.getInputNode());
    }
  }
}
