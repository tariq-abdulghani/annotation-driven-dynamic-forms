import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DynamicFormComponent } from './views/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEntityProcessorService } from '../public-api';
import { DynamicFormInputComponent } from './ui/components/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './ui/components/dynamic-form/dynamic-form.component';
import { ErrorMessagePipe } from './ui/pipes/error-message.pipe';
import { InputComponent } from './ui/views/input/input.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    ErrorMessagePipe,
    InputComponent,
    DynamicFormInputComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent],
  providers: [FormEntityProcessorService],
})
export class DecoratorDrivenDynamicFormsModule {}
