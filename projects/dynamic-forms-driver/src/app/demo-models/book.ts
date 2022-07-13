import { AbstractControl } from '@angular/forms';
import {
  FormEntity,
  TextInput,
  Required,
  Submit,
  NumberInput,
  DateInput,
  NestedFormEntity,
  SelectInput,
  CustomInput,
  Max,
  AsyncValidation,
  UpdateStrategy,
  Min,
} from 'decorator-driven-dynamic-form';
import { Author } from './author';

@Submit({ id: 'submit', label: 'ok' })
@FormEntity({ name: 'book', updateStrategy: UpdateStrategy.ON_PLUR })
export class Book {
  @AsyncValidation({
    errorName: 'isbn',
    errorMessage: 'ISBN must be unique',
    validator: (control: AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let err = { isbn: true };
          resolve(err);
        }, 10000);
      });
    },
  })
  @Required({ message: 'isbn is mandatory' })
  @TextInput({
    id: 'isbn',
    name: 'isbn',
    type: 'text',
    placeHolder: 'ISBN',
    hint: 'hello world hint!',
    width: 4,
  })
  isbn: string | null = null;

  @NumberInput({
    id: 'price',
    name: 'price',
    hint: 'price cant be less than 1$',
    width: 4,
    label: 'price',
  })
  price: number | null = null;

  @DateInput({
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

  @SelectInput({
    id: 'genre',
    name: 'genre',
    bindLabel: 'description',
    bindValue: null,
    dataSource: [
      { id: 1, description: 'funny' },
      { id: 2, description: 'horror' },
      { id: 3, description: 'sci' },
    ],
    compareWith: (a, b) => a == b,
    label: 'genre',
  })
  genre: any = null;

  @Max({ maxValue: 10, message: "rate can't exceed 10" })
  @Min({ minValue: 0, message: "rate can't be negative" })
  @CustomInput({
    inputType: 'rating',
    id: 'rate',
    name: 'rate',
    fullRate: 10,
  })
  rate: number = 5;
}

/**
 


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

 */
