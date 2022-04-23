import {
  CheckboxControl,
  FormEntity,
  NumberControl,
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
  })
  married: boolean = false;
}
