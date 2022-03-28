import { Component, Input, OnInit } from '@angular/core';
import { FormMeta } from '../../models/types/forms-meta/form-meta';
import { LabelStyling } from '../../models/types/forms-meta/label-styling';
import { InputDescription } from '../../models/types/inputs-meta/input-description';
import { InputTypes } from '../../models/types/inputs-meta/input-types.enum';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';

@Component({
  selector: '[lib-composite-input]',
  templateUrl: './composite-input.component.html',
  styleUrls: ['./composite-input.component.css'],
})
export class CompositeInputComponent implements OnInit {
  @Input() formDescription!: InputDescription<FormMeta>;
  readonly CONTROL_TYPES = InputTypes;
  constructor() {}

  ngOnInit(): void {}

  get legendClasses() {
    return {
      // 'col-form-label': this.labelStyling != LabelStyling.START,
      'col-sm-2': this.formDescription.meta.labelStyling == LabelStyling.START,
    };
  }

  get inputContainerClasses() {
    // return `col-md-${this.inputDescription.meta.width || 12}`;
    return {
      'col-sm': this.formDescription.meta.labelStyling == LabelStyling.START,
      row: this.formDescription.meta.labelStyling != LabelStyling.START,
    };
  }
}
