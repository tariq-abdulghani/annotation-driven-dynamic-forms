import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DecoratorDrivenDynamicFormsModule } from 'decorator-driven-dynamic-form';

import { AppComponent } from './app.component';
import { CustomTextInputComponent } from './custom-inputs/custom-text-input/custom-text-input.component';

@NgModule({
  declarations: [AppComponent, CustomTextInputComponent],
  imports: [BrowserModule, DecoratorDrivenDynamicFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
