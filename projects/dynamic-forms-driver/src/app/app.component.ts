import { Component, OnInit } from '@angular/core';
import { LoginForm } from './demo-models/login-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms-driver';

  loginForm = new LoginForm();

  onSubmit($event: any) {
    console.log(this.loginForm);
    console.log($event);
  }

  ngOnInit(): void {
    //@ts-ignore
    this.loginForm.gender = { label: 'male', id: 'm' };
    this.loginForm.age = 50;
    this.loginForm.address = {
      city: 'zxxxx4545',
      state: 'sr',
      zipCode: '78',
    };
  }
}
