import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './decorator-demo/demo/demo.component';
import { TreeArraySelectorComponent } from './tree-array-selector/tree-array-selector.component';
import { DecoratorDrivenDynamicFormsModule } from './decorator-driven-dynamic-forms/decorator-driven-dynamic-forms.module';

@NgModule({
  declarations: [AppComponent, DemoComponent, TreeArraySelectorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DecoratorDrivenDynamicFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
