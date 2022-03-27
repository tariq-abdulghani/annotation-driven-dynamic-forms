import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputTypes } from '../../models/types/inputs-meta/input-types.enum';
import { Layout } from '../../models/types/forms-meta/form-layout-enum';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';
import { InputDescription } from '../../models/types/inputs-meta/input-description';
import { FormMeta } from '../../models/types/forms-meta/form-meta';

@Component({
  selector: '[dd-dynamic-from-control]',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.css'],
  providers: [DataLoaderService],
})
export class DynamicFromControlComponent implements OnInit {
  @Input() formDescription!: InputDescription<FormMeta>;
  readonly CONTROL_TYPES = InputTypes;
  readonly FORM_LAYOUT_OPTS = Layout;
  constructor(private dataLoader: DataLoaderService) {}

  ngOnInit(): void {}

  loadData(
    dataSource: URL | any[] | Observable<any[]>
  ): Observable<any[]> | Promise<any[]> {
    return this.dataLoader.load(dataSource);
  }
}
