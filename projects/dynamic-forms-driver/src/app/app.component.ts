import { Component } from '@angular/core';
import { PersonForm } from './demo-models/person-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dynamic-forms-driver';

  personDto: PersonForm = new PersonForm('ahmed', 28);
  onSubmit($event: any) {
    console.log($event);
  }
}
