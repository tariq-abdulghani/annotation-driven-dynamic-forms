import { AbstractControl } from '@angular/forms';
import {
  FormEntity,
  TextControl,
  NotNull,
  Submit,
  NumberControl,
  DateControl,
  AsyncValidation,
} from 'decorator-driven-dynamic-form';

@Submit({ id: 'submit', label: 'ok' })
@FormEntity()
export class Book {
  @AsyncValidation({
    errorName: 'async',
    errorMessage:
      'async validation is working now u can call back end and validate easily',
    validator: (control: AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ async: true });
        }, 10000);
      });
    },
  })
  @NotNull({ message: 'isbn is mandatory' })
  @TextControl({
    id: 'isbn',
    name: 'isbn',
    type: 'text',
    placeHolder: 'ISBN',
    hint: 'hello world hint!',
    width: 4,
  })
  isbn: string | null = null;

  @NumberControl({
    id: 'price',
    name: 'price',
    hint: 'price cant be less than 1$',
    width: 4,
  })
  price: number | null = null;

  @DateControl({
    id: 'publishDate',
    name: 'publishDate',
    type: 'date',
  })
  publishDate: string | null = null;
}
