import { Component, Input, OnInit } from '@angular/core';
import { InputNode } from '../../../core/models/types/inputs/input-node';

@Component({
  selector: '[lib-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  private inputNode!: InputNode;
  private value!: any;

  constructor() {}

  ngOnInit(): void {}

  public getInputNode() {
    return this.inputNode;
  }

  public initialize(input: InputNode) {
    this.inputNode = input;
    this.value = this.getValue();
    this.onChange();
  }

  public setValue(val: any) {
    this.inputNode
      .getControl()
      .setValue(val, { self: false, emitEvent: false });
  }

  public commitChanges() {
    this.inputNode.getControl().updateValueAndValidity();
  }

  public getValue() {
    return this.inputNode.getControl().value;
  }

  private onChange() {
    this.inputNode.getControl().valueChanges.subscribe((val) => {
      if (JSON.stringify(val) == JSON.stringify(this.value)) {
        return;
      } else {
        this.value = val;
      }
    });
  }
}
