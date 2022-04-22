import { Component, Input, OnInit } from '@angular/core';
import { InputTypes } from '../../../core/models/types/inputs/input-types.enum';
// import { LabelStyling } from '../../models/types/forms/label-styling';

import { DataLoaderService } from '../../services/data-loader/data-loader.service';

@Component({
  selector: '[lib-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DataLoaderService],
})
export class InputComponent implements OnInit {
  readonly INPUT_TYPES = InputTypes;

  // @Input() labelStyling!: LabelStyling;
  // @Input() inputDescription!: InputNode;
  // constructor(public dataLoader: DataLoaderService) {}

  ngOnInit(): void {}

  // get inputContainerClasses() {
  //   // return `col-md-${this.inputDescription.meta.width || 12}`;
  //   return {
  //     'col-md': this.labelStyling != LabelStyling.START,
  //     row: this.labelStyling == LabelStyling.START,
  //   };
  // }

  // get labelClasses() {
  //   return {
  //     'form-label': this.labelStyling == LabelStyling.TOP,
  //     'col-sm-2 col-form-label': this.labelStyling == LabelStyling.START,
  //   };
  // }

  // get inputDivClass() {
  //   return this.labelStyling == LabelStyling.START ? 'col' : 'col-12';
  // }

  // get inputDivClasses() {
  //   return {
  //     col: this.labelStyling == LabelStyling.START,
  //     'col-12': this.labelStyling == LabelStyling.TOP,
  //     'form-floating': this.labelStyling == LabelStyling.FLOAT,
  //   };
  // }

  // get isFloatingLabel() {
  //   return this.labelStyling === LabelStyling.FLOAT;
  // }

  // get legendClasses() {
  //   return {
  //     // 'col-form-label': this.labelStyling != LabelStyling.START,
  //     'col-sm-2': this.labelStyling == LabelStyling.START,
  //   };
  // }

  // get compositeLegendClasses() {
  //   return {
  //     // 'col-form-label': this.labelStyling != LabelStyling.START,
  //     'col-sm-2':
  //       this.inputDescription.getProperty('labelStyling') == LabelStyling.START,
  //   };
  // }

  // // composite
  // get compositeInputContainerClasses() {
  //   // return `col-md-${this.inputDescription.meta.width || 12}`;
  //   return {
  //     'col-sm':
  //       this.inputDescription.getProperty('labelStyling') == LabelStyling.START,
  //     row:
  //       this.inputDescription.getProperty('labelStyling') != LabelStyling.START,
  //   };
  // }
  // // radio
  // get radioLabelClasses() {
  //   return {
  //     'col-form-label':
  //       this.labelStyling == LabelStyling.TOP ||
  //       this.labelStyling == LabelStyling.FLOAT,
  //     'col-sm-2 col-form-label': this.labelStyling == LabelStyling.START,
  //   };
  // }

  // get radioLegendClasses() {
  //   return {
  //     // 'col-form-label': this.labelStyling != LabelStyling.START,
  //     'col-sm-2': this.labelStyling == LabelStyling.START,
  //   };
  // }

  // get radioInputContainerClasses() {
  //   // return `col-md-${this.inputDescription.meta.width || 12}`;
  //   return {
  //     'col-sm': this.labelStyling == LabelStyling.START,
  //     row: this.labelStyling != LabelStyling.START,
  //   };
  // }
}
