import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControlTypes } from '../../models/types/control-types.enum';
import { FormLayout } from '../../models/types/form-layout-enum';
import { FormDescriptor } from '../../models/types/controls-descriptors.ts';

@Component({
  selector: 'app-dynamic-from-control',
  templateUrl: './dynamic-from-control.component.html',
  styleUrls: ['./dynamic-from-control.component.css'],
})
export class DynamicFromControlComponent implements OnInit {
  @Input() formDescriptor!: FormDescriptor;
  readonly CONTROL_TYPES = ControlTypes;
  readonly FORM_LAYOUT_OPTS = FormLayout;
  private dataSources = new Map<string, Observable<any[]>>(); //used to return the same observable to stop async pipe from sending multiple http requests
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    console.log(this.formDescriptor);
  }

  loadData(
    dataSource: URL | any[] | Observable<any[]>
  ): Observable<any[]> | Promise<any[]> {
    if (dataSource instanceof URL) {
      if (!this.dataSources.get(dataSource.href)) {
        this.dataSources.set(
          dataSource.href,
          this.httpClient.get<any[]>(dataSource.href)
        );
      }
      return this.dataSources.get(dataSource.href) || of([]);
    } else if (Array.isArray(dataSource)) {
      return of(dataSource);
    } else {
      return dataSource;
    }
  }
}
