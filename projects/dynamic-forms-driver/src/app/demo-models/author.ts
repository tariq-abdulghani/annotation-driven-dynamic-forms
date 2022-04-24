import {
  CheckboxControl,
  FormEntity,
  NumberControl,
  RadioButtonsControl,
  TextControl,
} from 'decorator-driven-dynamic-form';

@FormEntity()
export class Author {
  @TextControl({
    id: 'name',
    name: 'name',
    type: 'text',
    placeHolder: 'name',
    width: 4,
  })
  name: string = 'Adam';

  @NumberControl({
    id: 'age',
    name: 'age',
    width: 4,
  })
  age: number = 28;

  @CheckboxControl({
    id: 'married',
    name: 'married',
    label: 'married',
    width: 4,
  })
  married: boolean = false;

  @RadioButtonsControl({
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
  })
  gender: any = null;
}
