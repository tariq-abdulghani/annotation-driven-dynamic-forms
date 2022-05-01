import { BasicActionMeta } from '../actions/actions';
import { UpdateStrategy } from './form-update-strategy';

export type FormSpec = {
  name: string;
  updateStrategy?: UpdateStrategy;
};

export type NestedFormSpec = {
  legend?: string;
  name: string;
  declaredClass: any;
  legendClass?: string;
  width?: number;
};

export class FormMeta {
  name: string;
  actions: BasicActionMeta[];
  updateStrategy: UpdateStrategy;

  constructor(formSpec: FormSpec) {
    this.name = formSpec?.name;
    this.actions = [];
    this.updateStrategy = formSpec.updateStrategy
      ? formSpec.updateStrategy
      : UpdateStrategy.ON_CHANGE;
  }
}
