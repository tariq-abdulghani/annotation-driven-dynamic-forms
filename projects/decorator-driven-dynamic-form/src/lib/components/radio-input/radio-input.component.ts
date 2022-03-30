import { Component, Input, OnInit } from '@angular/core';
import { LabelStyling } from '../../models/types/forms/label-styling';
import { InputDescription } from '../../models/types/inputs/input-description';
import { InputSpec } from '../../models/types/inputs/input-specs';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';

@Component({
  selector: '[lib-radio-input]',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css'],
  providers: [DataLoaderService],
})
export class RadioInputComponent implements OnInit {
  @Input() labelStyling!: LabelStyling;
  @Input() inputDescription!: InputDescription;
  constructor(public dataLoader: DataLoaderService) {}

  ngOnInit(): void {}

  get labelClasses() {
    return {
      'col-form-label':
        this.labelStyling == LabelStyling.TOP ||
        this.labelStyling == LabelStyling.FLOAT,
      'col-sm-2 col-form-label': this.labelStyling == LabelStyling.START,
    };
  }

  get legendClasses() {
    return {
      // 'col-form-label': this.labelStyling != LabelStyling.START,
      'col-sm-2': this.labelStyling == LabelStyling.START,
    };
  }

  get inputContainerClasses() {
    // return `col-md-${this.inputDescription.meta.width || 12}`;
    return {
      'col-sm': this.labelStyling == LabelStyling.START,
      row: this.labelStyling != LabelStyling.START,
    };
  }
}
