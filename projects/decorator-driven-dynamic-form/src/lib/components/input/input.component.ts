import { Component, Input, OnInit } from '@angular/core';
import { LabelStyling } from '../../models/types/forms/label-styling';
import { InputDescription } from '../../models/types/inputs/input-description';
import { InputSpec } from '../../models/types/inputs/input-specs';

@Component({
  selector: '[lib-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() labelStyling!: LabelStyling;
  @Input() inputDescription!: InputDescription;
  constructor() {}

  ngOnInit(): void {}

  get inputContainerClasses() {
    // return `col-md-${this.inputDescription.meta.width || 12}`;
    return {
      'col-md': this.labelStyling != LabelStyling.START,
      row: this.labelStyling == LabelStyling.START,
    };
  }

  get labelClasses() {
    return {
      'form-label': this.labelStyling == LabelStyling.TOP,
      'col-sm-2 col-form-label': this.labelStyling == LabelStyling.START,
    };
  }

  get inputDivClass() {
    return this.labelStyling == LabelStyling.START ? 'col' : 'col-12';
  }

  get inputDivClasses() {
    return {
      col: this.labelStyling == LabelStyling.START,
      'col-12': this.labelStyling == LabelStyling.TOP,
      'form-floating': this.labelStyling == LabelStyling.FLOAT,
    };
  }

  get isFloatingLabel() {
    return this.labelStyling === LabelStyling.FLOAT;
  }
}
