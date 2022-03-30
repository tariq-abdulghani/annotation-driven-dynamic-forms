import { FormEntity, TextControl } from 'decorator-driven-dynamic-form';

@FormEntity()
export class UserData {
  @TextControl({
    id: 'userName',
    name: 'userName',
    type: 'text',
    label: 'user name',
  })
  userName: string | null = null;

  @TextControl({
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'email',
  })
  email: string | null = null;
}
