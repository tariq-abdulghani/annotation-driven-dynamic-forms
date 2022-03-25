import { BasicActionMeta } from '../actions/actions-api';
import { Layout } from './form-layout-enum';
import { ActionsPosition } from './form-actions-position';
import { UpdateStrategy } from './form-update-strategy';

export type FormSpec = {
  layout: Layout;
  updateStrategy: UpdateStrategy;
  actionPositions: ActionsPosition;
};

export type NestedFormSpec = {
  legend: string;
  name: string;
  declaredClass: any;
};

abstract class BaseFormMeta {
  layout!: Layout;
  updateStrategy!: UpdateStrategy;
  isGrid(): boolean {
    return this.layout == Layout.GRID;
  }
}

export class FormMeta extends BaseFormMeta {
  actions: BasicActionMeta[];
  actionPositions: ActionsPosition;
  layout: Layout;
  updateStrategy: UpdateStrategy;

  constructor(formSpec?: FormSpec) {
    super();
    this.actions = [];
    this.actionPositions = formSpec
      ? formSpec.actionPositions
      : ActionsPosition.GRID_FLOW;
    this.layout = formSpec ? formSpec.layout : Layout.GRID;
    this.updateStrategy = formSpec
      ? formSpec.updateStrategy
      : UpdateStrategy.EAGER;
  }
}

export class NestedFormMeta extends BaseFormMeta {
  legend: string;
  name: string;
  declaredClass: any;

  constructor(formSpec: NestedFormSpec) {
    super();
    this.legend = formSpec.legend;
    this.name = formSpec.name;
    this.declaredClass = formSpec.declaredClass;
  }
}
