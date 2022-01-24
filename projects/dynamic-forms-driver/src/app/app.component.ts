import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginForm } from './demo-models/login-form';
import { PersonForm } from './demo-models/person-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'dynamic-forms-driver';

  // @FormModelSmartSetter
  // personDto: PersonForm = new PersonForm('ahmed', 28);

  loginForm = new LoginForm();

  loginForm2 = new LoginForm();

  onSubmit($event: any) {
    console.log($event);
  }

  ngOnInit(): void {
    console.log(new LoginForm());
    // throw new Error('Method not implemented.');
    //@ts-ignore
    this.loginForm2.gender = { label: 'male', id: 'm' };
    this.loginForm2.age = 50;
    this.loginForm2.address = {
      city: 'z',
      state: 'sr',
      zipCode: '78',
    };
  }

  ngAfterViewInit(): void {
    // this.loginForm2.name = 'Yas';
    // this.loginForm2.age = 50;
  }
}
