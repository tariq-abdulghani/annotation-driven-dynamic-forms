import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFromControlComponent } from './components/dynamic-from-control/dynamic-from-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import {FormEntityProcessorService} from "./services/form-entity-processor/form-entity-processor.service";

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFromControlComponent,
    ErrorMessagePipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent],
  providers:[FormEntityProcessorService]
})
export class DecoratorDrivenDynamicFormsModule {}
