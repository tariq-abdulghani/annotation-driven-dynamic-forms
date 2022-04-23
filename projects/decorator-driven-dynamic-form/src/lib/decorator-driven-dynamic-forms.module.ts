import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DynamicFormComponent } from './views/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEntityProcessorService } from '../public-api';
import { DynamicFormInputComponent } from './ui/components/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './ui/components/dynamic-form/dynamic-form.component';
import { ErrorMessagePipe } from './ui/pipes/error-message.pipe';
import { InputComponent } from './ui/components/input/input.component';
import { InputTemplateDirective } from './ui/directives/input-template.directive';
import { InputResolverComponent } from './ui/components/input-resolver/input-resolver.component';
import { InputAnchorDirective } from './ui/directives/input-anchor/input-anchor.directive';
import { TextInputComponent } from './ui/components/text-input/text-input.component';

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
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, InputTemplateDirective, InputComponent],
  providers: [FormEntityProcessorService],
})
export class DecoratorDrivenDynamicFormsModule {}
