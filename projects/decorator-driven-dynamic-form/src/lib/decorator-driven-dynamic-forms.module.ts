import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFromControlComponent } from './components/dynamic-from-control/dynamic-from-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './pipes/error-message.pipe';

@NgModule({
  declarations: [DynamicFormComponent, DynamicFromControlComponent, ErrorMessagePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, DynamicFromControlComponent],
})
export class DecoratorDrivenDynamicFormsModule {}
