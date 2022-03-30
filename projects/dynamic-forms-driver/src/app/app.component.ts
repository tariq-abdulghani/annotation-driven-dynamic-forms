import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MetaDataRegisterer } from 'decorator-driven-dynamic-form';
import { FormEntityProcessorService } from 'decorator-driven-dynamic-form';

import { ShopForm, ShopFormTransformer } from './demo-models/shop-from';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormEntityProcessorService],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'dynamic-forms-driver';

  shopForm = new ShopForm();
  // loginForm = new LoginForm();
  shopFormTransformer = new ShopFormTransformer();

  onSubmit($event: any) {
    console.log($event);
  }

  onChange($event: any) {
    console.log('new value', $event);
  }

  constructor(private formEntityProcessorService: FormEntityProcessorService) {}

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

    console.log(this.formEntityProcessorService.process(this.shopForm));
    this.shopForm.capacity = 1580;
    console.log(this.shopForm);
    console.log(MetaDataRegisterer.get(this.shopForm, 'shopName')); //capacity
    console.log(MetaDataRegisterer.get(this.shopForm, 'capacity')); //capacity//expiryDate
    console.log(MetaDataRegisterer.get(this.shopForm, 'expiryDate')); //rememberMe
    console.log(MetaDataRegisterer.get(this.shopForm, 'rememberMe')); //style
    console.log(MetaDataRegisterer.get(this.shopForm, 'style')); //paymentMethod
    console.log(MetaDataRegisterer.get(this.shopForm, 'paymentMethod')); //paymentMethod
  }

  ngAfterViewInit(): void {
    // console.log("address ", this.loginForm.address);
    // //@ts-ignore
    // this.loginForm.address.zipCode = "xxyl";
  }
}
