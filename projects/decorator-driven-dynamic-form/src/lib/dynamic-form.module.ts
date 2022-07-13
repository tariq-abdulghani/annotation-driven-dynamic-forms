import { ModuleWithProviders, NgModule, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './ui/components/dynamic-form/dynamic-form.component';
import { ErrorMessagePipe } from './ui/pipes/error-message.pipe';
import { InputComponent } from './ui/components/input/input.component';
import { InputTemplateDirective } from './ui/directives/input-template/input-template.directive';
import { InputResolverComponent } from './ui/components/input-resolver/input-resolver.component';
import { InputAnchorDirective } from './ui/directives/input-anchor/input-anchor.directive';

import { DateInputComponent } from './ui/components/default-inputs/date-input/date-input.component';
import { NumberInputComponent } from './ui/components/default-inputs/number-input/number-input.component';
import { TextInputComponent } from './ui/components/default-inputs/text-input/text-input.component';
import { CheckboxInputComponent } from './ui/components/default-inputs/checkbox-input/checkbox-input.component';
import { NestedFormComponent } from './ui/components/default-inputs/nested-form/nested-form.component';
import { RadioButtonsInputComponent } from './ui/components/default-inputs/radio-buttons-input/radio-buttons-input.component';
import { SelectInputComponent } from './ui/components/default-inputs/select-input/select-input.component';
import { EntityRegistry } from './core/services/entity-registry/entity-registry.service';
import { FormMetaData } from './core/models/decorators/forms/Form-meta-data';
import { ButtonTemplateDirective } from './ui/directives/button-template/button-template.directive';
import { FormEntityProcessorService } from './core/services/form-entity-processor/form-entity-processor.service';

@NgModule({
  declarations: [
    DynamicFormComponent,
    ErrorMessagePipe,
    InputComponent,
    InputTemplateDirective,
    InputResolverComponent,
    InputAnchorDirective,
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    CheckboxInputComponent,
    NestedFormComponent,
    RadioButtonsInputComponent,
    SelectInputComponent,
    ButtonTemplateDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    DynamicFormComponent,
    InputTemplateDirective,
    InputComponent,
    ButtonTemplateDirective,
  ],
})
export class DynamicFormModule {
  private static defaultInputComponents = [
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    CheckboxInputComponent,
    NestedFormComponent,
    RadioButtonsInputComponent,
    SelectInputComponent,
  ];

  public static register(
    entities: Type<any>[]
  ): ModuleWithProviders<DynamicFormModule> {
    entities.forEach((entity) => {
      const name = FormMetaData.get(entity.prototype)?.get('name');
      if (name) EntityRegistry.add(name, entity);
    });
    return {
      ngModule: DynamicFormModule,
      providers: [FormEntityProcessorService, EntityRegistry],
    };
  }
}
