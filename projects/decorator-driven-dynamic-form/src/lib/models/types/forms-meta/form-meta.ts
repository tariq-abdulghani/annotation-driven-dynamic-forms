import { BasicActionMeta } from '../actions/actions-api';
import { Layout } from './form-layout-enum';
import { ActionsPosition } from './form-actions-position';
import { UpdateStrategy } from './form-update-strategy';
import { LabelStyling } from './label-styling';

export type FormSpec = {
  layout: Layout;
  labelStyling: LabelStyling;
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
  labelStyling!: LabelStyling;
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
    this.labelStyling = formSpec ? formSpec.labelStyling : LabelStyling.TOP;
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
