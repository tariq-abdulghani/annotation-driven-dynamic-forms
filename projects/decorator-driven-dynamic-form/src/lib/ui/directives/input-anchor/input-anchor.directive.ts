import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dfInputAnchor]',
})
export class InputAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
