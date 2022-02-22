# Decorator Driven Dynamic Forms version 3.0.0-a

> Opinionated way to create dynamic forms with **no json** , **no inheritance**
> just use **decorators**

## What is new in this version

1- added readonly to meta data of control to enable fields to be readonly
2- added enableFn to controls meta to make them enabled or disabled based on form state some useful scenarios is to choose from radio to enable part of the form
3- added form update strategy to form meta data so now we can choose form update strategy eager or lazy.

## Project Goals

1. create annotation driven dynamic form no more inheritance I think metadata must be placed in decorators not as
   class attributes
2. take most used defaults into considerations we can't create something that abstracts every thing, but we can make
   some things that really fits in the common problems and repeated tasks
3. the ability to create forms fast _forms that search forms that perform crud operations_
   is a perfect example
4. intuitive API I think creating something great means we can use it easily and really understand it without many efforts
5. composable forms you can nest forms to any level to make form creation easily
6. supports two forms layouts

   6.1. grid

   6.2 single column

7. opinionated based on commons and defaults
8. binding form model to form control and view which mean you create the form model
   and any updates on it will be reflected on _UI_ and on form controls

## Dependencies

| Angular version | bootstrap Version |
| --------------- | :---------------: |
| 12.2.15         |       5.1.3       |

## Features

- [x] validation
- [x] customized error messages and string interpolation can be used `some text...${var} some text ..`
- [x] decorator driven
- [x] defaults like required controls have an `*` default error class
- [x] supports composition of forms
- [x] supports submit and reset actions
- [x] responsive relies on bootstrap5
- [x] single column layout

- [ ] theming is not supported yet
- [ ] custom styling is not supported yet
- [ ] internationalization is not supported yet

## Supported Controls

- [x] text controls
- [x] number controls
- [x] date controls
- [x] single select controls
- [x] check boxes
- [x] radio buttons

- [ ] multiple select is not supported yet
- [ ] range is not supported yet

## Repositories

[source on github ](https://github.com/tariq-abdulghani/annotation-driven-dynamic-forms.git), [npm package](https://www.npmjs.com/package/ddd-form)

## Install

> Note that:
> library is under active development so some API may change.
> please use each version documentation to test the library your opinions are appreciated

install boot strap if you don't have it`npm i bootstrap` and add it in styles
`npm i ddd-form`

[`npm install decorator-driven-dynamic-forms --save`]: #

## Use

1. import the _DecoratorDrivenDynamicFormsModule_ and _HttpClientModule_ into your app

```typescript
import { DecoratorDrivenDynamicFormsModule } from "decorator-driven-dynamic-forms.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, DecoratorDrivenDynamicFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. create form model classes

address class which is a form that will be nested in another form

```typescript
import {
  FormEntity,
  FormLayout,
  NotNull,
  TextControl,
} from "decorator-driven-dynamic-form";

@FormEntity()
export class Address {
  @NotNull({ message: "city is required " })
  @TextControl({
    name: "city",
    type: "text",
    id: "city",
    width: 4,
  })
  city!: string;

  @TextControl({
    name: "state",
    type: "text",
    id: "state",
    width: 4,
  })
  state!: string;

  @NotNull({ message: "zipCode is required " })
  @TextControl({
    name: "zipCode",
    type: "text",
    id: "zipCode",
    width: 4,
  })
  zipCode!: string;

  constructor(city: string, sate: string, zipCode: string) {
    this.city = city;
    this.state = sate;
    this.zipCode = zipCode;
  }
}
```

LoginForm our root form

```typescript
import {
  MaxLength,
  MinLength,
  NotNull,
  TextControl,
  Pattern,
  Reset,
  Submit,
  SelectControl,
  RadioButtons,
  NestedFormEntity,
  FormEntity,
  RequiredTrue,
  Max,
  Min,
  DateControl,
  NumberControl,
  CheckboxControl,
} from "decorator-driven-dynamic-form";

import { Address } from "./address-dto";

@Reset({ label: "clear", class: "btn btn-danger" })
@Submit({ label: "save", class: "btn btn-primary" })
@FormEntity()
export class LoginForm {
  @MaxLength({ maxlength: 20, message: "max length 20" })
  @MinLength({ minlength: 3, message: "min length 3" })
  @NotNull({ message: "user name is required!" })
  @TextControl({
    name: "fullName",
    type: "text",
    id: "full-name",
    label: "user name",
    placeHolder: "example ...",
  })
  name: string | null = null;

  @NotNull({ message: "password is required!" })
  @Pattern({
    pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message:
      "password must be 8 letters at least, and contains uppercase and special character and alphanumeric",
  })
  @TextControl({
    name: "password",
    type: "password",
    id: "password",
  })
  password: string | null = null;

  @Max({ maxValue: 100, message: "age cant be more than ${max} years" })
  @Min({ minValue: 7, message: "age cant be lass than ${min}" })
  @NotNull({ message: "age is required" })
  @NumberControl({
    id: "age1",
    name: "age",
    label: "age",
  })
  age = 30;

  @DateControl({
    id: "expiryDate",
    name: "expiryDate",
    label: "Expiry Date",
  })
  expiryDate: string | null = null;

  @SelectControl({
    id: "gender",
    name: "gender",
    label: "gender",
    dataSource: [
      { label: "male", id: "m" },
      { label: "female", id: "f" },
    ],
    bindLabel: "label",
    bindValue: null,
    compareWith: (a, b) => (a && b ? a.id == b.id : false),
  })
  gender = null;

  @RequiredTrue({ message: "must be true" })
  @CheckboxControl({
    name: "employee",
    id: "employee",
    label: "Employee",
    enableFn: (f: any) => f.payment.id == "v",
  })
  employee = true;

  @RadioButtons({
    id: "payment",
    name: "payment",
    legend: "Payment",
    dataSource: [
      { key: "visa", id: "v" },
      { key: "cash", id: "c" },
    ],
    bindLabel: "key",
    bindValue: null,
  })
  payment = { key: "visa", id: "v" };

  @NestedFormEntity({
    name: "address",
    classDeclaration: Address,
    legend: "Address",
  })
  address: Address | null = null;
}
```

3. create new instance of the model

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "dynamic-forms-driver";

  loginForm = new LoginForm();

  onSubmit($event: any) {
    console.log($event);
  }

  ngOnInit(): void {
    //@ts-ignore
    this.loginForm.gender = { label: "male", id: "m" };
    this.loginForm.age = 50;
    this.loginForm.address = {
      city: "z",
      state: "sr",
      zipCode: "78",
    };
  }
}
```

4. pass it to the dynamic-form-component

```angular2html
<div class="container">
  <ddd-form
    [formEntity]="loginForm"
    (submitEvent)="onSubmit($event)"
  ></ddd-form>
</div>

```

Run `ng s` and see the result your self.

## API summary

### Component API

| Input          |   type   |                                                                            description |
| -------------- | :------: | -------------------------------------------------------------------------------------: |
| `[formEntity]` | `Object` | any instance of class annotated with `@FormEntity()`, the input form model to the view |

| Output          |   type   |                            description |
| --------------- | :------: | -------------------------------------: |
| `(submitEvent)` | `Object` | `FormGroup` value of the rendered form |

### Decorators

#### `@FormEntity(param?:FormMeta)`

to declare class as form model that can be used in dynamic from component
param of type

```typescript
export interface FormMeta {
  updateStrategy: FormUpdateStrategy;
  layout: FormLayout; // defaults to `FormLayout.GRID`
}
```

update strategy of type

```typescript
export enum FormUpdateStrategy {
  EAGER = 0, // update  on change
  LAZY = 1, // update on blur
}
```

form layout is of type

```typescript
enum FormLayout {
  SINGLE_COLUMN = "SINGLE_COLUMN",
  GRID = "GRID",
}
```

#### `@NestedFormEntity(param: NestedFormMeta)`

to include FormEntity as field in another model
param of type

```typescript
interface NestedFormMeta {
  name: string;
  classDeclaration: any;
  legend?: string;
}
```

**name** : is the form group name you give to these form
**classDeclaration**: in the class it self that you want to make it as field `constructor`
**legend** if specified shows as legend of field set

#### `@Reset({ label: string, class: string })`

to set reset button meta data like label or even it class
default is null it has no configuration but

#### `@Submit({ label: 'save', class: 'btn btn-primary' })`

to set submit button meta data like label or even it class
in the future it should support its place left or right or center
default is `submit` and class is `btn btn-primary`.

#### `@TextControl(textCtrlMeta: TextControlMeta)`

```typescript
interface ControlMetaData {
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: number; // control width in bootstrap grid its value from 1 to 12
  style?: string; // inline style no supported yet
  class?: string; // you can provide your custom css class (not supported yet)

  enableFn?: (formValue: any) => boolean; // used to enable or disabled field based on form value called if defined to make the field enabled or disabled
  readonly?: boolean; // used to mark fields as read only works with text and number and dates only
  [x: string]: any;
}
interface TextControlMeta extends ControlMetaData {
  type: "text" | "password" | "email" | "url" | "tel";
}
```

#### `@NumberControl(numCtrlMeta: NumberControlMeta)`

```typescript
export interface NumberControlMeta extends ControlMetaData {}
```

#### `@DateControl(dateCtrlMeta: DateControlMeta)`

```typescript
export interface DateControlMeta extends ControlMetaData {}
```

#### `@SelectControl(selectMeta: SelectControlMeta)`

```typescript
interface SelectControlMeta extends ControlMetaData {
  bindLabel: string;
  bindValue: string | null;
  compareWith: (a: any, b: any) => boolean;
  dataSource: URL | any[] | Observable<any[]>; // component loads the data for you you jst tell what data source
  // URL: means the finding the resource through HTTP and GET
}
```

#### `@CheckboxControl(chBx: CheckboxMeta)`

```typescript
interface CheckboxMeta extends ControlMetaData {}
```

#### `@RadioButtons(radiosMeta: RadioButtonsMeta)`

```typescript
interface RadioButtonsMeta extends ControlMetaData, FieldSetMeta {
  bindLabel: string;
  bindValue: string | null;
  dataSource: URL | any[] | Observable<any[]>;
}
```

#### Validation Decorators

```typescript

// some errors needs some value to be more meaningful like
// min length or maxlength or min max
// its meaningless to say date it larger than the max value
// but its good to say `value is larger than  ${max}`

// this string interpolation i simple at run time that string is interpolated by
// `ValidationError` so `${var}` `var` is replaced by the value that the key `var` has
// in the error object

  @MaxLength({
    maxlength: number,
    message: string, // message can be parametrized ex: 'name cant be larger than  ${requiredLength} characters'
  })

  @MinLength({
    minlength: number,
    message: string ,
  })

  @NotNull({ message: string })

  @Max({ maxValue: number, message:  string})//message can be parametrized 'age cant be more than ${max} years'

  @Min({ minValue: number, message: string})//message can be parametrized 'age cant be lass than ${min}'

  @RequiredTrue({ message: string })

  @Email({ message: string })

```

## License

MIT
