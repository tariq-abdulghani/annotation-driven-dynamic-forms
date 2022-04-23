import { Component, Input, OnInit } from '@angular/core';
import { InputNode } from '../../../core/models/types/inputs/input-node';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';

@Component({
  selector: '[lib-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DataLoaderService],
})
export class InputComponent implements OnInit {
  @Input() inputNode!: InputNode;
  constructor() {}

  ngOnInit(): void {}

  public getInputNode() {
    return this.inputNode;
  }

  public setInputNode(input: InputNode) {
    this.inputNode = input;
  }
}
