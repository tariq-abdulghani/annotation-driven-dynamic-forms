import {
  TextControl,
  NotNull,
  Email,
  FormLayout,
  FormEntity,
  NestedFormEntity,
} from 'decorator-driven-dynamic-form';
import { Address } from './address-dto';

@FormEntity()
export class ContactInfo {
  @TextControl({
    id: 'tel',
    name: 'tel',
    type: 'tel',
    label: 'tel 1',
  })
  telA!: string;

  @TextControl({
    id: 'tel2',
    name: 'tel2',
    type: 'tel',
    label: 'tel 2',
  })
  telB!: string;

  @NotNull({ message: 'email is required' })
  @Email({ message: 'email must be a valid email pattern' })
  @TextControl({
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'email',
  })
  email!: string;

  @NestedFormEntity({ name: 'address', classDeclaration: Address })
  address!: Address; // new Address('FGH', 'NBH', '4578'); //{ city: 'city wow', state: 'state wow', zipCode: '1234' };
}
