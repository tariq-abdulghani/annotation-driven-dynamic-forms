import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './decorator-demo/demo/demo.component';
import { DynamicFormComponent } from './dynamic-forms/dynamic-form/dynamic-form.component';
import { SimpleDatePickerComponent } from './simple-date-picker/simple-date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    DynamicFormComponent,
    SimpleDatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
