# DecoratorDrivenForms

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

| Dependency | Version |
| ---------- | :-----: |
| Angular    |   ---   |
| bootstrap  |   ---   |

## Features

- [x] validation
- [x] customized error messages and string interpolation can be used `some text...${var} some text ..`
- [x] decorator driven
- [x] defaults like required controls have an `*` default error class
- [x] supports composition of forms
- [x] supports submit and reset actions
- [x] responsive relies on bootstrap5

- [ ] theming is not supported yet
- [ ] single column layout is not supported yet
- [ ] custom styling is not supported yet
- [ ] internationalization is not supported yet

## Supported Controls

- [x] text controls

- [x] number controls

- [x] date controls

- [x] single select controls

- [ ] multiple select is not supported yet
- [ ] range is not supported yet
- [ ] radio buttons is not supported yet
- [ ] check boxes is not supported yet

## Install

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
    <dd-dynamic-form
      [formModel]="contactInfoForm"
      (submitEvent)="onSubmit($event)">
    </dd-dynamic-form>
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

| Decorator                    | param |                                                                     Usage |
| ---------------------------- | :---: | ------------------------------------------------------------------------: |
| `@FormModel(param:FormMeta)` | `{}`  | to declare class as form model that can be used in dynamic from component |

## License

MIT
