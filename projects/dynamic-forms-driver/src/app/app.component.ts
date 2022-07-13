import { Component, OnInit } from '@angular/core';
import { Book } from './demo-models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms-driver';
  story: Book = {
    author: {
      age: 10,
      birthDate: null,
      deathDate: null,
      gender: null,
      married: true,
      name: 'sayed',
    },
    genre: null,
    isbn: '123456789',
    price: 200,
    publishDate: null,
    rate: 8,
  };
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
  setRate(value: any) {
    console.log(value);
  }
}
