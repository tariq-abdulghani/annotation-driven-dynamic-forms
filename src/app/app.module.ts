import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './decorator-demo/demo/demo.component';
import { DynamicFormComponent } from './dynamic-forms/dynamic-form/dynamic-form.component';
import { TreeArraySelectorComponent } from './tree-array-selector/tree-array-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    DynamicFormComponent,
    TreeArraySelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
