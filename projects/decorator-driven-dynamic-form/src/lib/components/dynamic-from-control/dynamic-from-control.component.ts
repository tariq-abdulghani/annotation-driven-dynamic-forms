import { Component, Input, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { ControlTypes } from '../../models/types/control-types.enum';
import { FormLayout } from '../../models/types/form-layout-enum';
import { FormDescription } from '../../models/types/forms-meta/FormDescription';
import {DataLoaderService} from "../../services/data-loader/data-loader.service";

@Component({
  selector: '[dd-dynamic-from-control]',
  templateUrl: './dynamic-from-control.component.html',
  styleUrls: ['./dynamic-from-control.component.css'],
  providers: [DataLoaderService]
})
export class DynamicFromControlComponent implements OnInit {
  @Input() formDescriptor!: FormDescription;
  readonly CONTROL_TYPES = ControlTypes;
  readonly FORM_LAYOUT_OPTS = FormLayout;
  constructor(private dataLoader: DataLoaderService) {}

  ngOnInit(): void {}

  loadData(
    dataSource: URL | any[] | Observable<any[]>
  ): Observable<any[]> | Promise<any[]> {
    return this.dataLoader.load(dataSource);
  }

}
