import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ShopForm, ShopFormTransformer } from './demo-models/shop-from';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'dynamic-forms-driver';

  shopForm = new ShopForm();
  // loginForm = new LoginForm();
  shopFormTransformer = new ShopFormTransformer();

  onSubmit($event: any) {
    console.log($event);
  }

  onClick($event: any) {
    console.log($event);
  }

  onChange($event: any) {
    console.log('new value', $event);
  }

  constructor() {}

  ngOnInit(): void {
    // //@ts-ignore
    // this.loginForm.gender = { label: 'male', id: 'm' };
    // this.loginForm.age = 50;
    // console.log("address ", this.loginForm.address);
    // // this.loginForm.address = {
    // //   city: 'wow',
    // //   state: 'sr',
    // //   zipCode: '78',
    // // };

    // console.log(this.formEntityProcessorService.process(this.shopForm));
    this.shopForm.capacity = 5;

    this.shopForm.userData = { email: 'kkk', userName: 'kjkjkj' };
    this.shopForm.userData.email = 'gggg';
    console.log(this.shopForm, this.shopForm.userData);
  }

  ngAfterViewInit(): void {
    //@ts-ignore
    // this.shopForm.userData?.email = 'ddd@ttt';
    // this.shopForm.userData = { email: 'kkk', userName: 'kjkjkj' };
  }
}
