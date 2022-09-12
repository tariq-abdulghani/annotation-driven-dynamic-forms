import { AbstractControl } from '@angular/forms';
import {
  CheckboxInput,
  CrossValidation,
  DateInput,
  FormEntity,
  Min,
  Required,
  NumberInput,
  RadioGroupInput,
  TextInput,
  UpdateStrategy,
} from 'decorator-driven-dynamic-form';

@CrossValidation({
  errorName: 'dateOfDeath',
  effects: [
    {
      input: 'deathDate', // input name that is affected by that constrain
      message: 'death date cant be less than birth date', // error message to display if at that input if the constrain is violated.
    },
  ],
  validatorFn: (control: AbstractControl) => {
    const deathDate = control.get('deathDate');
    const birthDate = control.get('birthDate');
    if (new Date(deathDate?.value) <= new Date(birthDate?.value)) {
      deathDate?.setErrors({ dateOfDeath: true });
      return { dateOfDeath: true };
    }
    return null;
  },
})
@FormEntity({ name: 'author', updateStrategy: UpdateStrategy.ON_CHANGE })
export class Author {
  @Required({ message: 'author name is mandatory' })
  @TextInput({
    order: 1,
    id: 'name',
    name: 'name',
    type: 'text',
    placeHolder: 'name',
    width: 4,
  })
  name: string = 'Adam'; // default value

  @Min({ minValue: 1, message: 'age cant be less than 1' })
  @NumberInput({
    id: 'age',
    name: 'age',
    width: 4,
    enableFn: (f) => {
      console.log('....', f.married);
      return !f.married;
    },
  })
  age: number = 28;

  @CheckboxInput({
    id: 'married',
    name: 'married',
    label: 'married',
    width: 4,
  })
  married: boolean = false;

  @RadioGroupInput({
    bindLabel: 'description',
    bindValue: null,
    inputWidth: 3,
    dataSource: [
      { id: 1, description: 'male' },
      { id: 2, description: 'female' },
      { id: 3, description: 'else!' },
    ],
    id: 'gender',
    legend: 'Gender',
    name: 'gender',
    enableFn: (f) => {
      console.log('....', f);
      return !f.married;
    },
  })
  gender: any = null;

  @DateInput({
    id: 'birth-date',
    name: 'birthDate',
    type: 'date',
    placeHolder: 'birth date',
  })
  birthDate: Date | null = null;

  @DateInput({
    id: 'death-date',
    name: 'deathDate',
    type: 'date',
    placeHolder: 'death date',
  })
  deathDate: Date | null = null;
}
