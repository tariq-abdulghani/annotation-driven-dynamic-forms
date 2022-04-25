import { Component, HostListener, OnInit } from '@angular/core';
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
  private valueChanged = false;

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
    console.log('update on ', this.getInputNode().getControl().updateOn);
  }

  get ratingItems(): number[] {
    return new Array(this.fullRate);
  }

  onClick(i: number) {
    // console.log(this.dynamicFormContextService.getContext());
    this.valueChanged = true;
    this.setValue(i + 1);
  }

  @HostListener('mouseleave', ['$event.target'])
  onPlur(target: any) {
    if (this.valueChanged) {
      this.commitChanges();
      this.valueChanged = false;
    }
  }
}
