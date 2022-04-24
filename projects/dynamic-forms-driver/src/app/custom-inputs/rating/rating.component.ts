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
  rate = 0;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.rate = this.inputNode.getControl().value;
  }

  get ratingItems(): number[] {
    return new Array(this.fullRate).fill(1);
  }

  onClick(i: number) {
    this.rate = i + 1;
    this.inputNode.getControl().setValue(this.rate);
  }
}
