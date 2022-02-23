import {AfterViewInit, Component, OnInit} from '@angular/core';
import { LoginForm } from './demo-models/login-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
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
    console.log("address ", this.loginForm.address);
    // this.loginForm.address = {
    //   city: 'wow',
    //   state: 'sr',
    //   zipCode: '78',
    // };

  }

  ngAfterViewInit(): void {
    console.log("address ", this.loginForm.address);
    //@ts-ignore
    this.loginForm.address.zipCode = "xxyl";
  }
}
