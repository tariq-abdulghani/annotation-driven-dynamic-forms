import { AbstractControl } from '@angular/forms';
import {
  FormEntity,
  TextControl,
  NotNull,
  Submit,
  NumberControl,
  DateControl,
  AsyncValidation,
  NestedFormEntity,
} from 'decorator-driven-dynamic-form';
import { Author } from './author';

@Submit({ id: 'submit', label: 'ok' })
@FormEntity()
export class Book {
  @AsyncValidation({
    errorName: 'isbn',
    errorMessage: 'ISBN length cant be less than 15 chars',
    validator: (control: AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let err =
            (control.value as string).length < 15 ? { isbn: true } : null;
          resolve(err);
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

  @NestedFormEntity({
    legend: 'Author',
    name: 'author',
    declaredClass: Author,
    legendClass: '',
  })
  author: Author | null = null;
}
