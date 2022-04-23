import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dfInputTemplate]',
})
export class InputTemplateDirective {
  @Input('inputType') inputType!: string;
  constructor(private templateRef: TemplateRef<any>) {}

  public getInputType() {
    return this.inputType;
  }

  public getTemplateRef() {
    return this.templateRef;
  }
}
