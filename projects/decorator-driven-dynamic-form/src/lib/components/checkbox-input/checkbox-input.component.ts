import { Component, Input, OnInit } from '@angular/core';
import { LabelStyling } from '../../models/types/forms-meta/label-styling';
import { InputDescription } from '../../models/types/inputs-meta/input-description';
import { InputSpec } from '../../models/types/inputs-meta/input-specs';

@Component({
  selector: '[lib-checkbox-input]',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent implements OnInit {
  @Input() labelStyling!: LabelStyling;
  @Input() inputDescription!: InputDescription<InputSpec>;
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
    return this.labelStyling == LabelStyling.START ? 'col' : 'col-12';
  }

  isFloatingLabel() {
    return this.labelStyling == LabelStyling.FLOAT;
  }
}
