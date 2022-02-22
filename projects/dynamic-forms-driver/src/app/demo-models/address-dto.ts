import {
  FormEntity,
  NotNull,
  TextControl,
} from 'decorator-driven-dynamic-form';

@FormEntity()
export class Address {
  @NotNull({ message: 'city is required ' })
  @TextControl({
    name: 'city',
    type: 'text',
    id: 'city',
    width: 4,
  })
  city!: string;

  @TextControl({
    name: 'state',
    type: 'text',
    id: 'state',
    width: 4,
  })
  state!: string;

  @NotNull({ message: 'zipCode is required ' })
  @TextControl({
    name: 'zipCode',
    type: 'text',
    id: 'zipCode',
    width: 4,
  })
  zipCode!: string;

  constructor(city: string, sate: string, zipCode: string) {
    this.city = city;
    this.state = sate;
    this.zipCode = zipCode;
  }
}
