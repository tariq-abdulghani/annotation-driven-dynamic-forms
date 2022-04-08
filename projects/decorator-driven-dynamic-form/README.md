# Decorator Driven Dynamic Forms version 5.0.0-a.1

> Opinionated way to create dynamic forms with **no json** , **no inheritance**
> just use **decorators**

## What is new in this version

new features
cross validation
custom buttons
buttons alignment

fixed issues
setting nested form elements issue is fixed.

## Project Goals

1. create annotation driven dynamic form no more inheritance I think metadata must be placed in decorators not as
   class attributes
2. take most used defaults into considerations we can't create something that abstracts every thing, but we can make
   some things that really fits in the common problems and repeated tasks
3. the ability to create forms fast _forms that search forms that perform crud operations_
   is a perfect example
4. intuitive API I think creating something great means we can use it easily and really understand it without many efforts
5. composable forms you can nest forms to any level to make form creation easily
6. supports complex layouts by using grids

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
- [x] supports composition of forms
- [x] responsive relies on bootstrap5

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
- [ ] text area not supported yet
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

## another use with cross validation

```typescript
import { AbstractControl } from "@angular/forms";
import {
  FormEntity,
  TextControl,
  NumberControl,
  DateControl,
  CheckboxControl,
  SelectControl,
  RadioButtonsControl,
  NestedFormEntity,
  Submit,
  Reset,
  NotNull,
  ActionsPosition,
  UpdateStrategy,
  FormValueTransformer,
  LabelStyling,
  Button,
} from "decorator-driven-dynamic-form";
import { CrossValidation } from "decorator-driven-dynamic-form";
import { UserData } from "./user-data";

@CrossValidation({
  errorName: "expirationDate",
  effects: [
    {
      input: "expiryDate",
      message: "expiration date cant be less than production date",
    },
  ],
  validatorFn: (control: AbstractControl) => {
    const expiryDate = control.get("expiryDate");
    const productionDate = control.get("productionDate");
    if (new Date(expiryDate?.value) <= new Date(productionDate?.value)) {
      expiryDate?.setErrors({ expirationDate: true });
      return { expirationDate: true };
    }
    return null;
  },
})
@Button({ label: "cancel", id: "cancel", class: "btn btn-danger" })
@Button({ label: "print", id: "print", class: "btn btn-light" })
@Submit({ label: "ok", id: "so" })
@Reset({ label: "clear", id: "do" })
@FormEntity({
  actionPositions: ActionsPosition.NEW_LINE_END,
  updateStrategy: UpdateStrategy.ON_SUBMIT,
  labelStyling: LabelStyling.FLOAT,
})
export class ShopForm {
  @NotNull({ message: "shopName cant be null ?" })
  @TextControl({
    id: "shopName",
    name: "shopName",
    type: "text",
    label: "shop name",
    width: 6,
    placeHolder: "asssss",
  })
  shopName: string | null | undefined = "job";

  @NumberControl({
    id: "capacity",
    name: "capacity",
    label: "capacity",
    placeHolder: "...",
    width: 6,
  })
  capacity: number | null = 200;

  @DateControl({
    id: "expiryDate",
    name: "expiryDate",
    type: "date",
    label: "expiry date",
  })
  expiryDate: string | null = "01-09-2023";

  @DateControl({
    id: "productionDate",
    name: "productionDate",
    type: "date",
    label: "production date",
  })
  productionDate: string | null = "01-01-2023";

  @CheckboxControl({
    id: "rememberMe",
    name: "rememberMe",
    label: "remember Me",
    width: 7,
  })
  rememberMe: boolean | null = false;
  @CheckboxControl({
    id: "callMe",
    name: "callMe",
    label: "call Me",
    width: 7,
  })
  callMe: boolean | null = false;

  @SelectControl({
    id: "style",
    name: "style",
    label: "style",
    bindLabel: "description",
    bindValue: null,
    placeHolder: "wow",
    compareWith: (a, b) => false,
    dataSource: [
      { id: 1, description: "visa" },
      { id: 2, description: "cash" },
    ],
  })
  style: any | null = null;

  @RadioButtonsControl({
    id: "paymentMethod",
    name: "paymentMethod",
    label: "paymentMethod",
    bindLabel: "description",
    bindValue: null,
    width: 6,
    inputWidth: 6,
    dataSource: [
      { id: 1, description: "visa" },
      { id: 2, description: "cash" },
    ],
    legend: "Payment Method",
  })
  paymentMethod: any = null;

  @NestedFormEntity({
    declaredClass: UserData,
    legend: "User Data",
    name: "userData",
    width: 12,
  })
  userData: UserData | null = null;
}

export class ShopFormTransformer
  implements FormValueTransformer<ShopForm, any>
{
  transform(formValue: ShopForm) {
    const transformedVal = {
      userInfo: formValue.userData,
      shopInfo: { name: formValue.shopName },
    };
    return transformedVal;
  }
}
```

```typescript
import { FormEntity, TextControl } from "decorator-driven-dynamic-form";

@FormEntity()
export class UserData {
  @TextControl({
    id: "userName",
    name: "userName",
    type: "text",
    label: "user name",
  })
  userName: string | null = "Bob";

  @TextControl({
    id: "email",
    name: "email",
    type: "email",
    label: "email",
  })
  email: string | null = null;
}
```

```typescript
export class AppComponent implements OnInit, AfterViewInit {
  title = "dynamic-forms-driver";

  shopForm = new ShopForm();
  // loginForm = new LoginForm();
  shopFormTransformer = new ShopFormTransformer();

  onSubmit($event: any) {
    console.log($event);
  }

  // fired when custom buttons clicked
  onClick($event: any) {
    console.log($event);
  }
  // fired when any form field changes
  onChange($event: any) {
    console.log("new value", $event);
  }

  constructor() {}
}
```

```angular2html
<div class="container">
  <ddd-form
    [formEntity]="shopForm"
    (changeEvent)="onChange($event)"
    (submitEvent)="onSubmit($event)"
    (buttonClickEvent)="onClick($event)"
  ></ddd-form>
</div>

```

Run `ng s` and see the result your self.

## API summary

### Component API

| Input                |               type               |                                                                                                             description |
| -------------------- | :------------------------------: | ----------------------------------------------------------------------------------------------------------------------: |
| `[formEntity]`       |             `Object`             |                                  any instance of class annotated with `@FormEntity()`, the input form model to the view |
| `[valueTransformer]` | 'FormValueTransformer<any, any>' | an interface if provided and object with that interface it will be used to trnsform form value based on trasform method |

| Output               |                 type                 |                                                                                          description |
| -------------------- | :----------------------------------: | ---------------------------------------------------------------------------------------------------: |
| `(submitEvent)`      |                `any`                 |                                                               `FormGroup` value of the rendered form |
| `(changeEvent)`      |                `any`                 |                                                                       `FormGroup` value after change |
| `(buttonClickEvent)` | `{buttonId: string, formValue: any}` | when added custom button to the form it will emit that object that contains button id and form value |

### Decorators

#### `@FormEntity(param?:FormSpec)`

to declare class as form model that can be used in dynamic from component
param of type

```typescript
export type FormSpec = {
  labelStyling: LabelStyling;
  updateStrategy: UpdateStrategy;
  actionPositions: ActionsPosition;
};
```

update strategy of type

```typescript
export enum UpdateStrategy {
  ON_CHANGE = "ON_CHANGE",
  ON_PLUR = "ON_PLUR",
  ON_SUBMIT = "ON_SUBMIT",
}
```

label styling

```typescript
export enum LabelStyling {
  TOP = "TOP",
  START = "START",
  FLOAT = "FLOAT",
}
```

actions position

```typescript
export enum ActionsPosition {
  GRID_FLOW = "GRID_FLOW", // makes actions follow gird used for inline forms
  NEW_LINE_START = "NEW_LINE_START", // make actions at start of new line after line break
  NEW_LINE_END = "NEW_LINE_END", // make actions at end of new line after line break
  NEW_LINE_CENTER = "NEW_LINE_CENTER", // make actions at center of new line after line break
}
```

#### `@NestedFormEntity(param: NestedFormSpec)`

to include FormEntity as field in another model
param of type

```typescript
export type NestedFormSpec = {
  legend: string;
  name: string;
  declaredClass: any;
  width?: number;
};
```

**name** : is the form group name you give to these form
**declaredClass**: in the class it self that you want to make it as field `constructor`
**legend** if specified shows as legend of field set

#### `@Reset(meta: NativeActionSpec)`

to set reset button meta data like label or even it class

#### `@Submit(meta: NativeActionSpec)`

to set submit button meta data like label or even it class
default class is `btn btn-primary`.

### `Button(meta: NativeActionSpec)`

to add a custom button to the form like cancel button
good use case is in pop up with from and you can cancel or save

```typescript
export type NativeActionSpec = {
  id: string;
  label: string;
  width?: number;
  class?: string;
  enableFn?: (ctx?: FormGroup) => boolean;
};
```

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
  inputWidth?: number; //  controls the width of each button so they can be on one line or one button on a line
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

### Cross Validation

used to validate form value taking relative relation between fields
good use case is date form and date to
where we want date from always be less than date to

```typescript
@CrossValidation(spec: CrossValidationSpec)
type Effect = {
  input: string;
  message: string; // error message appears when error occurs it will appear on that input
};
export type CrossValidationSpec = {
  errorName: string;
  effects: Effect[];
  validatorFn: ValidatorFn;
};
```

## License

MIT
