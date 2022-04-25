import { Component, OnInit } from '@angular/core';
import {
  DynamicFormContextService,
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
  constructor(private dynamicFormContextService: DynamicFormContextService) {
    super();
  }

  ngOnInit(): void {
    // console.log(this.dynamicFormContextService.getContext());
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
    // console.log(this.dynamicFormContextService.getContext());

    this.setValue(i + 1);
  }
}
