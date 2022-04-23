import { Component, Input, OnInit } from '@angular/core';
import { InputNode } from '../../../core/models/types/inputs/input-node';
import { InputTypes } from '../../../core/models/types/inputs/input-types.enum';

import { DataLoaderService } from '../../services/data-loader/data-loader.service';

@Component({
  selector: '[lib-dynamic-form-input]',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.css'],
  providers: [DataLoaderService],
})
export class DynamicFormInputComponent implements OnInit {
  readonly INPUT_TYPES = InputTypes;
  @Input() inputNode!: InputNode;
  constructor(public dataLoader: DataLoaderService) {}

  ngOnInit(): void {}
}
