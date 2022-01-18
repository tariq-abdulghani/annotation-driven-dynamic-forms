import { Component, OnInit } from '@angular/core';
import { FormModelSmartSetter } from 'projects/decorator-driven-dynamic-form/src/lib/models/decorators/form-setter-getter';
import { PersonForm } from './demo-models/person-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms-driver';

  @FormModelSmartSetter
  personDto: PersonForm = new PersonForm('ahmed', 28);

  onSubmit($event: any) {
    console.log($event);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
