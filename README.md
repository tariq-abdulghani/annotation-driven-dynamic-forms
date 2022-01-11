# DecoratorDrivenForms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

## Project Goals
1. create annotation driven dynamic form no more inheritance  I think metadata must be placed in decorators not as 
   class attributes
   
2. take most used defaults into considerations we can't create something that abstracts every thing, but we can make 
   some things that really fits in the common problems and repeated tasks
   
3. the ability to creates form fast, simple forms' ex: forms that search forms that perform crud operations
is a perfect example
   
4. intuitive API I think creating something great means we can use it easily and really understand it without many efforts
   
5. composable forms you can nest forms to any level to make form creation easily
   
6. supports two forms layouts 
   
   6.1. grid
   
   6.2 single column

7. opinionated based on  commons and defaults

## Dependencies
| Version        | Angular           | 
| ------------- |:-------------:| 
| ---     | --- | 
## Features
- [x] validation 
- [x] decorator driven
- [x] defaults like required controls have an `*` default error class
- [x] supports composition of forms
- [x] supports submit and reset actions

- [ ] theming is not supported yet
- [ ] custom styling is not supported yet
- [ ] internationalization is not supported yet



## Supported Controls
- [x] text controls

- [x] number controls

- [x] date controls

- [x] single select controls

- [ ] multiple select
- [ ]  range
- [ ]  radio buttons
- [ ]  check boxes




## Install
`untill  now you can download the source `

[`npm install decorator-driven-dynamic-forms  --save`]: #

## Use
1. import the module into your app
```typescript
import { DecoratorDrivenDynamicFormsModule } from 'decorator-driven-dynamic-forms.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DecoratorDrivenDynamicFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
2. create form model class 
```typescript
import { FormModel } from 'DecoratorDrivenDynamicFormsModule/models/decorators/form-model';
import { NestedFormModel } from 'DecoratorDrivenDynamicFormsModule/models/decorators/nested-form-model';

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
  address!: Address;
}
```
3. create new instance of the model 

```typescript

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'decorator-driven-forms';

  contactInfoForm: ContactInfo = new ContactInfo();

  constructor() {}
}
```
4. pass it to the dynamic-form-component
```angular2html
<app-dynamic-form [formModel]="contactInfoForm"></app-dynamic-form>
```

Run `ng run start` and see the result your self.


## API summary

### Decorators
| Decorator        | param           | Usage  |
| ------------- |:-------------:| -----:|
| `@FormModel(param:FormMeta)`      | `{}` | to declare class as form model that can be used in dynamic from component |


## License
MIT

