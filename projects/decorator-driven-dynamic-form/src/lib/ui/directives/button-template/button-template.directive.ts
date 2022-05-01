import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dfButton]',
})
export class ButtonTemplateDirective {
  constructor(private templateRef: TemplateRef<any>) {}

  getTemplate() {
    return this.templateRef;
  }
}
