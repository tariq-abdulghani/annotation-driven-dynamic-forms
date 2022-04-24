import { Component, OnInit } from '@angular/core';
import {
  DynamicFormInput,
  InputComponent,
} from 'decorator-driven-dynamic-form';

@DynamicFormInput({ inputType: 'rating' })
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent extends InputComponent implements OnInit {
  fullRate = 5;
  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.getValue() == null) {
      // remember to always initialize variables to avoid null pointer exceptions
      // always do that in ngOnInit
      this.setValue(0);
    }
  }

  get ratingItems(): number[] {
    return new Array(this.fullRate);
  }

  onClick(i: number) {
    this.setValue(i + 1);
  }
}
