import { Component, OnInit } from '@angular/core';
import { FormEntityProcessor } from '../models/formEntityProcessor';
import { Point } from '../models/point';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  point = new Point(1,2,3, new Date());
  constructor() { }

  ngOnInit(): void {
    console.log(FormEntityProcessor.generateFormDescriptor(this.point));
  }

}
