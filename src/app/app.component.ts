import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonForm } from './decorator-driven-dynamic-forms/models/demo-models/person-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'decorator-driven-forms';

  personDto: PersonForm = new PersonForm('ahmed', 28);

  constructor() {}
}
