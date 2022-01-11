import { Address } from './address-dto';
import { TextControl } from '../decorators/common-controls';
import { FormModel } from '../decorators/form-model';
import { NestedFormModel } from '../decorators/nested-form-model';

@FormModel({})
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

  @NestedFormModel({ name: 'address', classDeclaration: Address })
  address!: Address; // new Address('FGH', 'NBH', '4578'); //{ city: 'city wow', state: 'state wow', zipCode: '1234' };
}
