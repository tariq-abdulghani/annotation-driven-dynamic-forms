import { Component, Input, OnInit } from '@angular/core';
import { FormMeta } from '../../models/types/forms/form-meta';
import { LabelStyling } from '../../models/types/forms/label-styling';
import { InputDescription } from '../../models/types/inputs/input-description';
import { InputTypes } from '../../models/types/inputs/input-types.enum';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';

@Component({
  selector: '[lib-composite-input]',
  templateUrl: './composite-input.component.html',
  styleUrls: ['./composite-input.component.css'],
})
export class CompositeInputComponent implements OnInit {
  @Input() formDescription!: InputDescription;
  readonly CONTROL_TYPES = InputTypes;
  constructor() {}

  ngOnInit(): void {}

  get legendClasses() {
    return {
      // 'col-form-label': this.labelStyling != LabelStyling.START,
      'col-sm-2': this.formDescription.metaData.get('labelStyling') == LabelStyling.START,
    };
  }

  get inputContainerClasses() {
    // return `col-md-${this.inputDescription.meta.width || 12}`;
    return {
      'col-sm': this.formDescription.metaData.get('labelStyling') == LabelStyling.START,
      row: this.formDescription.metaData.get('labelStyling') != LabelStyling.START,
    };
  }
}
