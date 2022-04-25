import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Book } from './demo-models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms-driver';

  bookEntity = new Book();
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

  ngOnInit(): void {}
}

// setRate(value: any) {
//   console.log(value);
//   this.bookEntity.rate = value;
// }
