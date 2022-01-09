import { Validators } from '@angular/forms';
import { TextControl } from './decorators/common-controls';
import { FormModel } from './decorators/form-model';

@FormModel({})
export class Address {
  @TextControl({
    name: 'city',
    type: 'text',
    id: 'city',
    width: 4,
    validators: [Validators.required],
  })
  city!: string;

  @TextControl({
    name: 'state',
    type: 'text',
    id: 'state',
    width: 4,
    validators: [Validators.required],
  })
  state!: string;

  @TextControl({
    name: 'zipCode',
    type: 'text',
    id: 'zipCode',
    width: 4,
    validators: [Validators.required],
  })
  zipCode!: string;

  constructor(city: string, sate: string, zipCode: string) {
    this.city = city;
    this.state = sate;
    this.zipCode = zipCode;
  }
}
