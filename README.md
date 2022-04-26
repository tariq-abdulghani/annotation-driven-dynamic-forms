# Decorator Driven Dynamic Forms version 8.0.0-a.1

> Opinionated way to create dynamic forms with **no json** , **no inheritance**
> just use **decorators**

## What is new in this version

1. UI Customization
   you can provide templates and components to be used as UI elements in form
2. CSS style file that provide variables and classes that u can use to customize
   existing UI

## Project Goals

0. use one consistent strategy for creating form some thing that can be used as specification like other frame works ex JPA java persistence API just an API that tells how to do data base related operation
1. create annotation driven dynamic form no more inheritance I think metadata must be placed in decorators not as
   class attributes
2. take most used defaults into considerations we can't create something that abstracts every thing, but we can make
   some things that really fits in the common problems and repeated tasks
3. the ability to create forms fast _forms that search, forms that perform CRUD operations_
   is a perfect example
4. intuitive API I think creating something great means we can use it easily and really understand it without many efforts

5. composable forms you can nest forms to any level to make form creation easily

6. supports complex layouts by using grids

7. opinionated based on commons and defaults

8. binding form model to form control and view which mean you create the form model
   and any updates on it will be reflected on _UI_ and on form controls
9. flexibility to customize UI , UI that uou want , UI can change but forms, inputs, validations are concepts that are the same.

## Dependencies

| Angular version | bootstrap Version |
| --------------- | :---------------: |
| 12.2.15         |       5.1.3       |

## Features

- [x] validation
- [x] cross validation
- [x] async validation
- [x] customized error messages and string interpolation can be used `some text...${var} some text ..`
- [x] decorator driven
- [x] supports composition of forms
- [x] responsive relies on bootstrap5
- [x] layout management based on bootstrap5 grid

- [x] theming you can override css classes and styles
- [x] UI customization you can add your own templates or even your components for customized inputs

- [ ] internationalization is not supported yet

## Supported Controls

- [x] text control
- [x] number control
- [x] date control
- [x] single select control
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

[`npm install decorator-driven-dynamic-forms --save`]: # after that add its styles from
`decorator-driven-dynamic-form/assests/styles/styles.css` to your angular app

## How To Use?

is step by step demonstration of common use cases

we will model book and author models where book refers to an author

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

author class is turned into form entity by using decorators and each field is mapped to an input based on the annotation and we provide meta data to the view.

we can control layout using width ` width: 4` layout is managed by bootstrap5 grid and each input is column and the whole form is a row
any nested forms will take column and creates row as container for each input it has.
which provides flexibility in layout break points are managed till now by the form

```typescript
import {
  CheckboxInput,
  FormEntity,
  NumberInput,
  RadioGroupInput,
  TextInput,
} from "decorator-driven-dynamic-form";

@FormEntity()
export class Author {
  @TextInput({
    id: "name",
    name: "name",
    type: "text",
    placeHolder: "name",
    width: 4,
  })
  name: string = "Adam";

  @NumberInput({
    id: "age",
    name: "age",
    width: 4,
  })
  age: number = 28;

  @CheckboxInput({
    id: "married",
    name: "married",
    label: "married",
    width: 4,
  })
  married: boolean = false;

  @RadioGroupInput({
    bindLabel: "description",
    bindValue: null,
    inputWidth: 3,
    dataSource: [
      { id: 1, description: "male" },
      { id: 2, description: "female" },
      { id: 3, description: "else!" },
    ],
    id: "gender",
    legend: "Gender",
    name: "gender",
  })
  gender: any = null;
}
```

book is related to author (each time we enter a book we enter its author data this is not real world scenario, but this example shows how to compose forms using already existing forms)
we can add buttons to the form and configure its styles
standard form actions are supported natively, non standard buttons can be added to it will be explained later.

```typescript
import {
  FormEntity,
  TextInput,
  NotNull,
  Submit,
  NumberInput,
  DateInput,
  NestedFormEntity,
  SelectInput,
  Max,
} from "decorator-driven-dynamic-form";
import { Author } from "./author";

@Submit({ id: "submit", label: "ok" })
@FormEntity()
export class Book {
  @NotNull({ message: "isbn is mandatory" })
  @TextInput({
    id: "isbn",
    name: "isbn",
    type: "text",
    placeHolder: "ISBN",
    hint: "hello world hint!",
    width: 4,
  })
  isbn: string | null = null;

  @NumberInput({
    id: "price",
    name: "price",
    hint: "price cant be less than 1$",
    width: 4,
  })
  price: number | null = null;

  @DateInput({
    id: "publishDate",
    name: "publishDate",
    type: "date",
  })
  publishDate: string | null = null;

  @NestedFormEntity({
    legend: "Author",
    name: "author",
    declaredClass: Author,
    legendClass: "",
  })
  author: Author | null = null;

  @SelectInput({
    id: "genre",
    name: "genre",
    bindLabel: "description",
    bindValue: null,
    dataSource: [
      { id: 1, description: "funny" },
      { id: 2, description: "horror" },
      { id: 3, description: "sci" },
    ],
    compareWith: (a, b) => a == b,
    label: "genre",
  })
  genre: any = null;
}
```

3. create the entity and prepare parent component to handle the events
   here we use it directly in app component but we can use it in any other components

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [],
})
export class AppComponent implements OnInit {
  title = "dynamic-forms-driver";

  bookEntity = new Book();
  onSubmit($event: any) {
    console.log($event);
  }

  onClick($event: any) {
    console.log($event);
  }

  onChange($event: any) {
    console.log("new value", $event);
  }

  constructor() {}

  ngOnInit(): void {}
}
```

4. pass it the form entity to the dynamic-form-component

```angular2html
<ddd-form
    [formEntity]="bookEntity"
    (changeEvent)="onChange($event)"
    (submitEvent)="onSubmit($event)"
    (buttonClickEvent)="onClick($event)"
  >
</ddd-form>

```

5. Run `ng s` and see the result your self.

note we have two way binding between form entity and the UI form u see so if you set any value in the form entity
it will be reflected in UI and any change in UI will be reflected in the entity
so try`this.bookEntity.isbn = 'pla-pla'` press Ctl+s and see

## adding validation

in book class we can see the lines

```typescript
@NotNull({ message: "isbn is mandatory" })
  @TextInput({
    id: "isbn",
    name: "isbn",
    type: "text",
    placeHolder: "ISBN",
    hint: "hello world hint!",
    width: 4,
  })
  isbn: string | null = null; // field isbn in book class now is required
```

which is used to make the field required
we can add multiple validations on single field
validations list

1. NotNull
2. Min
3. Max
4. MaxLength
5. MinLength
6. RequiredTrue
7. Pattern

lets add some validation to the author set min age and name constrains

```typescript
import {
  CheckboxInput,
  FormEntity,
  Min,
  NotNull,
  NumberInput,
  RadioGroupInput,
  TextInput,
} from "decorator-driven-dynamic-form";

@FormEntity()
export class Author {
  @NotNull({ message: "author name is mandatory" })
  @TextInput({
    id: "name",
    name: "name",
    type: "text",
    placeHolder: "name",
    width: 4,
  })
  name: string = "Adam"; // default value

  @Min({ minValue: 1, message: "age cant be less than 1" })
  @NumberInput({
    id: "age",
    name: "age",
    width: 4,
  })
  age: number = 28;

  @CheckboxInput({
    id: "married",
    name: "married",
    label: "married",
    width: 4,
  })
  married: boolean = false;

  @RadioGroupInput({
    bindLabel: "description",
    bindValue: null,
    inputWidth: 3,
    dataSource: [
      { id: 1, description: "male" },
      { id: 2, description: "female" },
      { id: 3, description: "else!" },
    ],
    id: "gender",
    legend: "Gender",
    name: "gender",
  })
  gender: any = null;
}
```

## another form of validation 'Cross Validation'

cross validation puts constrains across form fields
like staring date, end date fields are constrained,
some time you accept some combination of value only here you can use cross validation
its used on the form entity

`we will add date of birth and date of death of the author and if date of death is provided it must be > birth date`
lets add the block

```typescript
@CrossValidation({
  errorName: 'dateOfDeath',
  effects: [
    {
      input: 'deathDate', // input name that is affected by that constrain
      message: 'death date cant be less than birth date', // error message to display if at that input if the constrain is violated.
    },
  ],
  validatorFn: (control: AbstractControl) => {
    const deathDate = control.get('deathDate');
    const birthDate = control.get('birthDate');
    if (new Date(deathDate?.value) <= new Date(birthDate?.value)) {
      deathDate?.setErrors({ expirationDate: true });
      return { dateOfDeath: true };
    }
    return null;
  },
})

```

now author class looks like

```typescript
import { AbstractControl } from "@angular/forms";
import {
  CheckboxInput,
  CrossValidation,
  DateInput,
  FormEntity,
  Min,
  NotNull,
  NumberInput,
  RadioGroupInput,
  TextInput,
} from "decorator-driven-dynamic-form";

@CrossValidation({
  errorName: "dateOfDeath",
  effects: [
    {
      input: "deathDate", // input name that is affected by that constrain
      message: "death date cant be less than birth date", // error message to display if at that input if the constrain is violated.
    },
  ],
  validatorFn: (control: AbstractControl) => {
    // control represents form group that holds all the inputs
    const deathDate = control.get("deathDate");
    const birthDate = control.get("birthDate");
    if (new Date(deathDate?.value) <= new Date(birthDate?.value)) {
      deathDate?.setErrors({ dateOfDeath: true });
      return { dateOfDeath: true };
    }
    return null;
  },
})
@FormEntity()
export class Author {
  @NotNull({ message: "author name is mandatory" })
  @TextInput({
    id: "name",
    name: "name",
    type: "text",
    placeHolder: "name",
    width: 4,
  })
  name: string = "Adam"; // default value

  @Min({ minValue: 1, message: "age cant be less than 1" })
  @NumberInput({
    id: "age",
    name: "age",
    width: 4,
  })
  age: number = 28;

  @CheckboxInput({
    id: "married",
    name: "married",
    label: "married",
    width: 4,
  })
  married: boolean = false;

  @RadioGroupInput({
    bindLabel: "description",
    bindValue: null,
    inputWidth: 3,
    dataSource: [
      { id: 1, description: "male" },
      { id: 2, description: "female" },
      { id: 3, description: "else!" },
    ],
    id: "gender",
    legend: "Gender",
    name: "gender",
  })
  gender: any = null;

  @DateInput({
    id: "birth-date",
    name: "birthDate",
    type: "date",
    placeHolder: "birth date",
  })
  birthDate: Date | null = null;

  @DateInput({
    id: "death-date",
    name: "deathDate",
    type: "date",
    placeHolder: "death date",
  })
  deathDate: Date | null = null;
}
```

## another form of validation AsyncValidation

used when we validate at backend server so the can be done too
`we will make sure isbn is unique before submitting the book form`

we will add the block
this is just demo for async validation
but in real world scenario we will add a service that will call back end end point to validate
this will explained later we just explore th API

```typescript
 @AsyncValidation({
    errorName: "isbn",
    errorMessage: "ISBN must be unique",
    validator: (control: AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let err = { isbn: true };
          resolve(err);
        }, 10000);
      });
    },
  })
```

```typescript
import { AbstractControl } from "@angular/forms";
import {
  FormEntity,
  TextInput,
  NotNull,
  Submit,
  NumberInput,
  DateInput,
  NestedFormEntity,
  SelectInput,
  CustomInput,
  Max,
  AsyncValidation,
} from "decorator-driven-dynamic-form";
import { Author } from "./author";

@Submit({ id: "submit", label: "ok" })
@FormEntity({ updateStrategy: UpdateStrategy.ON_PLUR })
export class Book {
  @AsyncValidation({
    errorName: "isbn",
    errorMessage: "ISBN must be unique",
    validator: (control: AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let err = { isbn: true };
          resolve(err);
        }, 10000);
      });
    },
  })
  @NotNull({ message: "isbn is mandatory" })
  @TextInput({
    id: "isbn",
    name: "isbn",
    type: "text",
    placeHolder: "ISBN",
    hint: "hello world hint!",
    width: 4,
  })
  isbn: string | null = null;

  @NumberInput({
    id: "price",
    name: "price",
    hint: "price cant be less than 1$",
    width: 4,
  })
  price: number | null = null;

  @DateInput({
    id: "publishDate",
    name: "publishDate",
    type: "date",
  })
  publishDate: string | null = null;

  @NestedFormEntity({
    legend: "Author",
    name: "author",
    declaredClass: Author,
    legendClass: "",
  })
  author: Author | null = null;

  @SelectInput({
    id: "genre",
    name: "genre",
    bindLabel: "description",
    bindValue: null,
    dataSource: [
      { id: 1, description: "funny" },
      { id: 2, description: "horror" },
      { id: 3, description: "sci" },
    ],
    compareWith: (a, b) => a == b,
    label: "genre",
  })
  genre: any = null;
}
```

note we added `@FormEntity({ updateStrategy: UpdateStrategy.ON_PLUR }) `
its good for performance to change form update strategy to ON_PLUR or ON_SUBMIT
available update strategies

1. ON_CHANGE // default
2. ON_PLUR
3. ON_SUBMIT

## UI Customization

1. override CSS file provided
2. provide templates to customize form locally (per use)
   ex:
   `let-inputNode` provides inputNode to the developer to use
   input node is the building block of this lib

```angular2html
<div class="container">
  <ddd-form
    [formEntity]="bookEntity"
    (changeEvent)="onChange($event)"
    (submitEvent)="onSubmit($event)"
    (buttonClickEvent)="onClick($event)"
  >
    <ng-template dfInputTemplate [inputType]="'NUMBER'" let-inputNode>
      <label class="form-label">{{ inputNode.getProperty("label") }} </label>
      <input type="number" [formControl]="inputNode.getControl()" />
    </ng-template>
  </ddd-form>
</div>
```

```typescript
export interface InputNode {
  setProperties(map: Map<string, any>): void;
  addProperty(key: string, value: any): void;
  getProperty(key: string): any;

  setControl(control: AbstractControl): void;
  getControl(): AbstractControl;

  setErrorMap(map: Map<string, string>): void;
  getError(key: string): string | undefined;
  addError(key: string, value: string): void;

  addChild(node: InputNode): void;
  addChildren(nodes: InputNode[]): void;
  getChildren(): InputNode[] | null;

  isValid(): boolean;
  inValid(): boolean;
  isPending(): boolean;
}
```

3. provide cutom ui components
   ex`lets create rating component which is used to rate books`

let create the component first
use `@DynamicFormInput({ inputType: "rating" })` to provide it for framework to be used as input

```typescript
import { Component, HostListener, OnInit } from "@angular/core";
import {
  DynamicFormContextService,
  DynamicFormInput,
  InputComponent,
} from "decorator-driven-dynamic-form";

@DynamicFormInput({ inputType: "rating" })
@Component({
  selector: "app-rating.rating-component",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent extends InputComponent implements OnInit {
  fullRate = 5;
  private valueChanged = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.getValue() == null) {
      // remember to always initialize variables to avoid null pointer exceptions
      // always do that in ngOnInit
      this.setValue(0);
    }
    this.fullRate =
      this.getInputNode().getProperty("fullRate") || this.fullRate;
    console.log("update on ", this.getInputNode().getControl().updateOn);
  }

  get ratingItems(): number[] {
    return new Array(this.fullRate);
  }

  onClick(i: number) {
    this.valueChanged = true;
    this.setValue(i + 1);
  }

  @HostListener("mouseleave", ["$event.target"])
  onPlur(target: any) {
    if (this.valueChanged) {
      this.commitChanges();
      this.valueChanged = false;
    }
  }
}
```

rating html

```html
<label class="form-label d-form-label">rate</label>
<div class="rating-warapper form-control d-form-input">
  <span
    class="ratingStar"
    *ngFor="let ratingStar of ratingItems; let i = index"
    [ngClass]="{ 'bright-ratingStar': i < getValue() }"
    (click)="onClick(i)"
  >
    &#9733;
  </span>
</div>
```

rating css

```css
.ratingStar {
  cursor: pointer;
  display: inline-block;
  font-size: 1.5em;
  color: #777;
}

.bright-ratingStar {
  color: gold;
  /* color: #0d6efd; */
  /* color: gainsboro; */
}

.dimmed-ratingStar {
  color: #777;
}

.rating-component {
  display: block;
}

.rating-warapper {
  max-width: fit-content !important;
}

.rating-warapper:hover {
  border-color: #0d6efd;
  box-shadow: var(--df-focus-box-shadow);
}
```

and in our book class mark input to use it as its input mapping

```typescript
@Max({ maxValue: 10, message: 'ddfff' })
@Min({ minValue: 0, message: 'ddfff' })
@CustomInput({
  inputType: 'rating',
  id: 'rate',
  name: 'rate',
  fullRate: 10,
})
rate: number = 5
```

book class now looks like

```typescript
@Submit({ id: "submit", label: "ok" })
@FormEntity({ updateStrategy: UpdateStrategy.ON_PLUR })
export class Book {
  @AsyncValidation({
    errorName: "isbn",
    errorMessage: "ISBN must be unique",
    validator: (control: AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let err = { isbn: true };
          resolve(err);
        }, 10000);
      });
    },
  })
  @NotNull({ message: "isbn is mandatory" })
  @TextInput({
    id: "isbn",
    name: "isbn",
    type: "text",
    placeHolder: "ISBN",
    hint: "hello world hint!",
    width: 4,
  })
  isbn: string | null = null;

  @NumberInput({
    id: "price",
    name: "price",
    hint: "price cant be less than 1$",
    width: 4,
    label: "price",
  })
  price: number | null = null;

  @DateInput({
    id: "publishDate",
    name: "publishDate",
    type: "date",
  })
  publishDate: string | null = null;

  @NestedFormEntity({
    legend: "Author",
    name: "author",
    declaredClass: Author,
    legendClass: "",
  })
  author: Author | null = null;

  @SelectInput({
    id: "genre",
    name: "genre",
    bindLabel: "description",
    bindValue: null,
    dataSource: [
      { id: 1, description: "funny" },
      { id: 2, description: "horror" },
      { id: 3, description: "sci" },
    ],
    compareWith: (a, b) => a == b,
    label: "genre",
  })
  genre: any = null;

  @Max({ maxValue: 10, message: "ddfff" })
  @Min({ minValue: 0, message: "ddfff" })
  @CustomInput({
    inputType: "rating",
    id: "rate",
    name: "rate",
    fullRate: 10,
  })
  rate: number = 5;
}
```

## API summary

### Component API

#### DynamicFormComponent API selector `ddd-form`

| Input                |               type               |                                                                                                               description |
| -------------------- | :------------------------------: | ------------------------------------------------------------------------------------------------------------------------: |
| `[formEntity]`       |             `Object`             |                                    any instance of class annotated with `@FormEntity()`, the input form model to the view |
| `[valueTransformer]` | `FormValueTransformer<any, any>` | an interface if provided and object with that interface it will be used to transform form value based on transform method |

| Output               |                 type                 |                                                                                          description |
| -------------------- | :----------------------------------: | ---------------------------------------------------------------------------------------------------: |
| `(submitEvent)`      |                `any`                 |                                                               `FormGroup` value of the rendered form |
| `(changeEvent)`      |                `any`                 |                                                                       `FormGroup` value after change |
| `(buttonClickEvent)` | `{buttonId: string, formValue: any}` | when added custom button to the form it will emit that object that contains button id and form value |

### Classes

#### InputComponent

its just a class that you extend to add your own components as input components
it has the following description use this methods to integrate your component to dynamic form

```typescript
class InputComponent implements OnInit {
  private inputNode!: InputNode;
  protected value!: any;

  constructor() {}

  ngOnInit(): void {}

  public getInputNode(): InputNode;

  public initialize(input: InputNode): void;

  public setValue(val: any): void; // note this sets the value but doesn't update it

  public getValue(): any;

  public commitChanges(): void; // here update and validation happens

  private onChange(): void;
}
```

#### DynamicFormContextService

used to inject current form value if you want to know about it any time in your custom component

```typescript
@Injectable()
export class DynamicFormContextService {
  private context: any;
  constructor() {}

  public setContext(ctx: any) {
    this.context = ctx;
  }

  public getContext() {
    return this.context;
  }
}
```

#### FormEntityProcessorService

used top process the annotations used by the library to generate input nodes
you can use it to generate input nodes and write the full UI from scratch recommended if you like so

```typescript
@Injectable()
export class FormEntityProcessorService {
  constructor(private injector: Injector);
  public process(formEntity: any): InputNode;
  private createNode(
    entity: any,
    parentProperties?: Map<string, any>
  ): InputNode;

  private bindEntityToInputNode(
    target: any,
    propertyKey: string,
    formControl: FormControl
  ): void;

  private bindEntityToInputTree(
    target: any,
    propertyKey: string,
    formEntity: any
  ): void;
}
```

### Directives

#### InputTemplateDirective

used to register templates for input to customize per form good use case is login where u want to make inputs look different

example to use

```angular2html

<ddd-form
    [formEntity]="bookEntity"
    (changeEvent)="onChange($event)"
    (submitEvent)="onSubmit($event)"
    (buttonClickEvent)="onClick($event)"
  >
  <ng-template dfInputTemplate [inputType]="'NUMBER'" let-inputNode>
      <label>{{inputNode.getProperty('label')}}</label>
  </ng-template>
</ddd-form>

```

```typescript
Directive({
  selector: "[dfInputTemplate]",
});
export class InputTemplateDirective {
  @Input("inputType") inputType!: string;
  constructor(private templateRef: TemplateRef<any>) {}

  public getInputType(): string;

  public getTemplateRef(): TemplateRef;
}
```

### Decorators

#### `@FormEntity(param?:FormSpec)`

to declare class as form model that can be used in dynamic from component
param of type

```typescript
export type FormSpec = {
  updateStrategy: UpdateStrategy;
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

#### `@NestedFormEntity(specs: NestedFormSpec)`

to include FormEntity as field in another model
param of type

```typescript
export type NestedFormSpec = {
  legend: string;
  name: string;
  declaredClass: any;
  legendClass: string;
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

#### `@TextInput(specs: TextInputSpec)`

#### `@NumberInput(specs: NumberInputSpec)`

#### `@DateInput(specs: DateInputSpec)`

#### `@SelectInput(specs: SelectInputSpec)`

#### `@CheckboxInput(specs: CheckInputSpec)`

#### `@RadioGroupInput(specs: RadioButtonsSpec)`

#### `CustomInput(specs: CustomInputSpec)`

#### `@DynamicFormInput({ inputType: string })` // used to register components to be used in the form by custom input decorator

```typescript
export interface InputSpec {
  name: string;
  id: string;
  label?: string;
  placeHolder?: string;
  width?: number;
  style?: string;
  class?: string;
  enableFn?: (formValue: any) => boolean;
  readonly?: boolean;
  hint?: string;
  [x: string]: any;
}

export interface TextInputSpec extends InputSpec {
  type: "text" | "password" | "email" | "url" | "tel";
}

export interface DateInputSpec extends InputSpec {
  type: "date" | "month" | "week" | "datetime-local";
}

export interface NumberInputSpec extends InputSpec {}

export interface SelectInputSpec extends InputSpec {
  bindLabel: string;
  bindValue: string | null;
  compareWith: (a: any, b: any) => boolean;
  dataSource: URL | any[] | Observable<any[]>;
}

export interface CheckInputSpec extends InputSpec {}

export interface RadioButtonsSpec extends InputSpec {
  legend: string;
  bindLabel: string;
  bindValue: string | null;
  dataSource: URL | any[] | Observable<any[]>;
}
export interface CustomInputSpec extends InputSpec {
  inputType: string;
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

// message can be parametrized ex: 'name cant be larger than  ${requiredLength} characters'
  @MaxLength({maxlength: number, message: string})

  @MinLength({minlength: number, message: string})

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

### Async validation

used to validate fields asynchronously

```typescript
@AsyncValidation(specs: AsyncValidationSpec)

export interface InjectableAsyncValidatorProvider {
  provider: any; // class that is injectable that implements AsyncValidator interface
}
export type AsyncValidationSpec = {
  validator:
    | AsyncValidator // class that implements async validator interface and not injectable
    | AsyncValidatorFn
    | InjectableAsyncValidatorProvider; // injectable class that mplements async validator interface
  errorMessage: string;
  errorName: string;
};
```

## License

MIT
