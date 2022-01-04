import { Component, Input, OnInit } from '@angular/core';
import { ControlTypes } from '../dynamic-form/models/control-types.enum';
import { FormDescriptor, NestedFormDescriptor } from '../dynamic-form/models/formEntityProcessor';

@Component({
  selector: 'app-dynamic-from-control',
  templateUrl: './dynamic-from-control.component.html',
  styleUrls: ['./dynamic-from-control.component.css']
})
export class DynamicFromControlComponent implements OnInit {

  @Input() formDescriptor!: NestedFormDescriptor;
  readonly CONTROL_TYPES = ControlTypes;

  constructor() { }

  ngOnInit(): void {
    console.log(this.formDescriptor);
  }

}
