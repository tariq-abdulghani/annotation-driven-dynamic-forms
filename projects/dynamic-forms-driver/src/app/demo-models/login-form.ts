import {
  MaxLength,
  MinLength,
  NotNull,
  TextControl,
  Pattern,
  Reset,
  Submit,
} from 'decorator-driven-dynamic-form';

@Reset({ label: 'clear', class: 'btn btn-danger' })
@Submit({ label: 'save', class: 'btn btn-primary' })
export class LoginForm {
  // @MaxLength({
  //   maxlength: 10,
  //   message: 'name cant be larger than  ${requiredLength} characters',
  // })
  // @MinLength({
  //   minlength: 3,
  //   message: 'user name cant be less than ${requiredLength} characters ',
  // })
  @NotNull({ message: 'user name is required!' })
  @TextControl({
    name: 'fullName',
    type: 'text',
    id: 'full-name',
    label: 'user name',
    placeHolder: 'example ...',
  })
  name!: string;

  // @NotNull({ message: 'password is required!' })
  // @Pattern({
  //   pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  //   message:
  //     'password must be 8 letters at least, and contains uppercase and special character and alphanumeric',
  // })
  @TextControl({
    name: 'password',
    type: 'password',
    id: 'password',
  })
  password!: string | null;
}
