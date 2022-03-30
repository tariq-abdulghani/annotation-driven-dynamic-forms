import { BasicActionMeta } from '../actions/actions-api';
import { ActionsPosition } from './form-actions-position';
import { UpdateStrategy } from './form-update-strategy';
import { LabelStyling } from './label-styling';

export type FormSpec = {
  labelStyling: LabelStyling;
  updateStrategy: UpdateStrategy;
  actionPositions: ActionsPosition;
};

export type NestedFormSpec = {
  legend: string;
  name: string;
  declaredClass: any;
  width?: number;
};

abstract class BaseFormMeta {
  labelStyling!: LabelStyling;
  updateStrategy!: UpdateStrategy;
}

export class FormMeta extends BaseFormMeta {
  actions: BasicActionMeta[];
  actionPositions: ActionsPosition;
  updateStrategy: UpdateStrategy;

  constructor(formSpec?: FormSpec) {
    super();
    this.actions = [];
    this.actionPositions = formSpec
      ? formSpec.actionPositions
      : ActionsPosition.GRID_FLOW;
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
  width?: number;

  constructor(formSpec: NestedFormSpec) {
    super();
    this.legend = formSpec.legend;
    this.name = formSpec.name;
    this.declaredClass = formSpec.declaredClass;
    this.width = formSpec.width;
  }
}
