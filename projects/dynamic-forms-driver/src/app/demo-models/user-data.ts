import { AbstractControl } from '@angular/forms';
import {
  CrossValidation,
  FormEntity,
  TextControl,
} from 'decorator-driven-dynamic-form';

@CrossValidation({
  errorName: 'userNameEmail',
  effects: [
    {
      input: 'userName',
      message: 'email cant be the same as user name',
    },
  ],
  validatorFn: (userDataForm: AbstractControl) => {
    const userName = userDataForm.get('userName');
    userName?.setErrors({ userNameEmail: true });
    return { userNameEmail: true };
  },
})
@FormEntity()
export class UserData {
  @TextControl({
    id: 'userName',
    name: 'userName',
    type: 'text',
    label: 'user name',
  })
  userName: string | null = 'Bob';

  @TextControl({
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'email',
  })
  email: string | null = null;
}
