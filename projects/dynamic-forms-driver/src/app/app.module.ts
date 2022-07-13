import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormModule } from 'decorator-driven-dynamic-form';

import { AppComponent } from './app.component';
import { CustomTextInputComponent } from './custom-inputs/custom-text-input/custom-text-input.component';
import { RatingComponent } from './custom-inputs/rating/rating.component';
import { Author } from './demo-models/author';
import { Book } from './demo-models/book';

@NgModule({
  declarations: [AppComponent, CustomTextInputComponent, RatingComponent],
  imports: [
    BrowserModule,
    DynamicFormModule.register([Book, Author, RatingComponent]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
