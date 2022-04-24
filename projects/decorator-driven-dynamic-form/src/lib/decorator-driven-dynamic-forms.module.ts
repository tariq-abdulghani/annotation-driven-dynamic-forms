import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DynamicFormComponent } from './views/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEntityProcessorService } from '../public-api';
import { DynamicFormInputComponent } from './ui/views/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './ui/components/dynamic-form/dynamic-form.component';
import { ErrorMessagePipe } from './ui/pipes/error-message.pipe';
import { InputComponent } from './ui/components/input/input.component';
import { InputTemplateDirective } from './ui/directives/input-template.directive';
import { InputResolverComponent } from './ui/components/input-resolver/input-resolver.component';
import { InputAnchorDirective } from './ui/directives/input-anchor/input-anchor.directive';

import { DateInputComponent } from './ui/components/default-inputs/date-input/date-input.component';
import { NumberInputComponent } from './ui/components/default-inputs/number-input/number-input.component';
import { TextInputComponent } from './ui/components/default-inputs/text-input/text-input.component';
import { CheckboxInputComponent } from './ui/components/default-inputs/checkbox-input/checkbox-input.component';
import { NestedFormComponent } from './ui/components/default-inputs/nested-form/nested-form.component';
import { RadioButtonsInputComponent } from './ui/components/default-inputs/radio-buttons-input/radio-buttons-input.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    ErrorMessagePipe,
    InputComponent,
    DynamicFormInputComponent,
    InputTemplateDirective,
    InputResolverComponent,
    InputAnchorDirective,
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    CheckboxInputComponent,
    NestedFormComponent,
    RadioButtonsInputComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, InputTemplateDirective, InputComponent],
  providers: [FormEntityProcessorService],
})
export class DecoratorDrivenDynamicFormsModule {}
