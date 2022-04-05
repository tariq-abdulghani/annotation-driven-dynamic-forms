import { BasicActionMeta } from '../actions/actions';
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

export class FormMeta {
  actions: BasicActionMeta[];
  actionPositions: ActionsPosition;
  updateStrategy: UpdateStrategy;
  labelStyling!: LabelStyling;

  constructor(formSpec?: FormSpec) {
    this.actions = [];
    this.actionPositions = formSpec
      ? formSpec.actionPositions
      : ActionsPosition.GRID_FLOW;
    this.updateStrategy = formSpec
      ? formSpec.updateStrategy
      : UpdateStrategy.ON_CHANGE;
    this.labelStyling = formSpec ? formSpec.labelStyling : LabelStyling.TOP;
  }
}
