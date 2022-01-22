import { Component, OnInit } from '@angular/core';
import { LoginForm } from './demo-models/login-form';
import { PersonForm } from './demo-models/person-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms-driver';

  // @FormModelSmartSetter
  // personDto: PersonForm = new PersonForm('ahmed', 28);

  loginForm = new LoginForm();

  loginForm2 = new LoginForm();

  onSubmit($event: any) {
    console.log($event);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
