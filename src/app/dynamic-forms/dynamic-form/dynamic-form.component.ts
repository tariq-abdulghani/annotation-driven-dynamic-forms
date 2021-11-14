import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlTypes } from './models/control-types.enum';
import { FormDescriptor, FormEntityProcessor } from './models/formEntityProcessor';
import { PersonForm } from './models/person-dto';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  controlTypes = ControlTypes;
  personDTO: PersonForm = new PersonForm("ahmed", 28);
  formDescriptor!: FormDescriptor;
  constructor() { }

  ngOnInit(): void {
    this.formDescriptor  = FormEntityProcessor.generateFormDescriptor(this.personDTO);
    console.log(this.formDescriptor);
    // this.formDescriptor.formGroup.valueChanges.subscribe(value =>{
    //   console.log(value);
    // })

    // this.formDescriptor.formGroup.statusChanges.subscribe(value =>{
    //   console.log(value);
    // })
  }

  onSubmit(v: any){
    console.log(this.formDescriptor.formGroup.value);
  }

}
