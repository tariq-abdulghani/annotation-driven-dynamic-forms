import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './views/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { FormEntityProcessorService } from './services/form-entity-processor/form-entity-processor.service';
import { InputComponent } from './views/input/input.component';
@NgModule({
  declarations: [DynamicFormComponent, ErrorMessagePipe, InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent],
  providers: [FormEntityProcessorService],
})
export class DecoratorDrivenDynamicFormsModule {}
