import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from './models/person-dto';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  person: Person = new Person("ahmed", 28);

  constructor() { }

  ngOnInit(): void {
  }

}
