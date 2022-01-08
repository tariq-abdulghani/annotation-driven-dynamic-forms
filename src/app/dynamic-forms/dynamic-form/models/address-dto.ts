import { Validators } from '@angular/forms';
import { FormModel, TextControl } from './decorators/common-controls';

@FormModel({})
export class Address {
  @TextControl({
    name: 'city',
    type: 'city',
    id: 'city',
    width: 4,
    validators: [Validators.required],
  })
  city!: string;

  @TextControl({
    name: 'state',
    type: 'state',
    id: 'state',
    width: 4,
    validators: [Validators.required],
  })
  state!: string;

  @TextControl({
    name: 'zipCode',
    type: 'zipCode',
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
