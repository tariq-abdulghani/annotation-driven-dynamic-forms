import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputTypes } from '../../models/types/inputs-meta/input-types.enum';
import { Layout } from '../../models/types/forms-meta/form-layout-enum';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';
import { InputDescription } from '../../models/types/inputs-meta/input-description';
import { FormMeta } from '../../models/types/forms-meta/form-meta';
import { LabelStyling } from '../../models/types/forms-meta/label-styling';

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

  get legendClasses(){
    return {
      // 'col-form-label': this.labelStyling != LabelStyling.START,
      'col-sm-2': this.formDescription.meta.labelStyling == LabelStyling.START,
    }
  }

  get inputContainerClasses() {
    // return `col-md-${this.inputDescription.meta.width || 12}`;
    return {
      'col-sm': this.formDescription.meta.labelStyling == LabelStyling.START,
      row: this.formDescription.meta.labelStyling != LabelStyling.START,
    };
  }
}
