import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { FormEntityProcessorService } from './services/form-entity-processor/form-entity-processor.service';
import { InputComponent } from './components/input/input.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { RadioInputComponent } from './components/radio-input/radio-input.component';
import { CompositeInputComponent } from './components/composite-input/composite-input.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    ErrorMessagePipe,
    InputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    RadioInputComponent,
    CompositeInputComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent],
  providers: [FormEntityProcessorService],
})
export class DecoratorDrivenDynamicFormsModule {}
