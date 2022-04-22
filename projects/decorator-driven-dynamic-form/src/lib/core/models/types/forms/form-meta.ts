import { BasicActionMeta } from '../actions/actions';
import { UpdateStrategy } from './form-update-strategy';

export type FormSpec = {
  updateStrategy: UpdateStrategy;
};

export type NestedFormSpec = {
  legend: string;
  name: string;
  declaredClass: any;
  legendClass: string;
  width?: number;
};

export class FormMeta {
  actions: BasicActionMeta[];
  updateStrategy: UpdateStrategy;

  constructor(formSpec?: FormSpec) {
    this.actions = [];
    this.updateStrategy = formSpec
      ? formSpec.updateStrategy
      : UpdateStrategy.ON_CHANGE;
  }
}
