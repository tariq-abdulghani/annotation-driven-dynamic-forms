# Decorator Driven Dynamic Forms

> Opinionated way to create dynamic forms with **no json** , **no inheritance**
> just use **decorators**

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

| Version | Angular version | bootstrap Version |
| ------- | --------------- | :---------------: |
| 0.1.0   | 12.2.15         |       5.1.3       |

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
> library is under active development so some API may change in the future

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
import { TextControl } from "decorator-driven-dynamic-forms/models/decorators/common-controls";
import { FormModel } from "decorator-driven-dynamic-forms/models/decorators/form-model";
import { NotNull } from "decorator-driven-dynamic-forms/models/decorators/validation/common-validators";

@FormModel()
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

  @MinLength({
    minlength: 3,
    message: "zipCode be less than ${requiredLength} characters ",
  })
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

contact info our root form

```typescript
import { FormModel } from "DecoratorDrivenDynamicFormsModule/models/decorators/form-model";
import { NestedFormModel } from "DecoratorDrivenDynamicFormsModule/models/decorators/nested-form-model";

@Reset({ label: "clear", class: "btn btn-danger" })
@Submit({ label: "save", class: "btn btn-primary" })
@FormModel()
export class ContactInfo {
  @TextControl({
    id: "tel",
    name: "tel",
    type: "tel",
    label: "tel 1",
  })
  telA!: string;

  @TextControl({
    id: "tel2",
    name: "tel2",
    type: "tel",
    label: "tel 2",
  })
  telB!: string;

  @NestedFormModel({ name: "address", classDeclaration: Address })
  address!: Address;
}
```

3. create new instance of the model

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "decorator-driven-forms";

  contactInfoForm: ContactInfo = new ContactInfo();

  constructor() {}
  onSubmit($event: any) {
    console.log($event);
  }
}
```

4. pass it to the dynamic-form-component

```angular2html
      <ddd-form [formModel]="personDto" (submitEvent)="onSubmit($event)"></ddd-form>
```

Run `ng run start` and see the result your self.

## API summary

### Component API

| Input         |   type   |                                                                           description |
| ------------- | :------: | ------------------------------------------------------------------------------------: |
| `[formModel]` | `Object` | any instance of class annotated with `@FormModel()`, the input form model to the view |

| Output          |   type   |                            description |
| --------------- | :------: | -------------------------------------: |
| `(submitEvent)` | `Object` | `FormGroup` value of the rendered form |

### Decorators

#### `@FormModel(param?:FormMeta)`

to declare class as form model that can be used in dynamic from component
param of type

```typescript
interface FormMeta {
  formLayout?: FormLayout; // defaults to `FormLayout.GRID`
}
```

form layout is of type

```typescript
enum FormLayout {
  SINGLE_COLUMN = "SINGLE_COLUMN",
  GRID = "GRID",
}
```

#### `@NestedFormModel(param: NestedFormMeta)`

to include formModel as field in another model
param of type

```typescript
interface NestedFormMeta {
  name: string;
  classDeclaration: any;
}
```

**name** : is the form group name you give to these form
**classDeclaration**: in the class it self that you want to make it as field `constructor`

#### `@Reset({ label: string, class: any })`

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

#### `@SplittedDateRangeControl(sdrMeta: SplittedDateRangeMeta)`

declares a date range but rendered in ui as two controls

```typescript
interface SplittedDateRangeMeta {
  startDate: {
    name: string;
    id: string;
    placeHolder?: string;
    label?: string;
    notNull?: { message: string };
  };
  endDate: {
    name: string;
    id: string;
    placeHolder?: string;
    label?: string;
  };
  from: Date; // range start
  to: Date; // range end
  optional?: boolean; // default false
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}
```

**optional** used to make the two dates nullable or not
it must be used with a field of type `[Date, Date]`

ex:

```typescript
@SplittedDateRangeControl({
    from: new Date(),
    to: new Date(2030, 10, 10),
    startDate: {
      id: 'date-of-birth',
      name: 'dateOfBirth',
      placeHolder: 'yyyy/mm/dd',
      label: 'birth date',
    },
    endDate: {
      id: 'date-of-death',
      name: 'dateOfDeath',
      placeHolder: 'yyyy/mm/dd',
      label: 'quietus date',
    },
    optional: true,
  })
  dates!: [Date | null | string, Date | null | string];
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
