import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ControlTypes } from './models/control-types.enum';
import { FormLayout } from './models/form-layout-enum';
import {
  FormDescriptor,
  FormEntityProcessor,
} from './models/formEntityProcessor';
import { PersonForm } from './models/person-dto';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  readonly CONTROL_TYPES = ControlTypes;
  readonly FORM_LAYOUT_OPTS = FormLayout;
  
  formDescriptor!: FormDescriptor;
  @Input('formModel') formModel!: any;
  constructor(private httpClient : HttpClient) {}

  ngOnInit(): void {
    // console.log("init #############33");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.formModel){
      // console.log("onchange #############33");
      this.formModel = changes.formModel.currentValue;
      this.formDescriptor = FormEntityProcessor
      .generateFormDescriptor(
        this.formModel
      );
      console.log(this.formDescriptor);
      console.log(this.formModel);
    }
  }

  private dataSources = new Map<string, Observable<any[]>>();

  

  onSubmit(v: any) {
    console.log(this.formDescriptor.formGroup);
  }

   count  = 0;
  loadData(dataSource: string | any[]| Observable<any[]>): Observable<any[]> | Promise<any[]>{
    // console.log("$$$$$$$$$$$$$$$$$$$$load data is called ", dataSource, this.count++);
    if(typeof dataSource == 'string'){
      if(!this.dataSources.get(dataSource)){
        this.dataSources.set(dataSource, this.httpClient.get<any[]>(dataSource));
      }       
      return this.dataSources.get(dataSource) || of([]);
    }else if (Array.isArray(dataSource)){
      return of(dataSource);
    }else {
      return dataSource;
    }
  }
}
