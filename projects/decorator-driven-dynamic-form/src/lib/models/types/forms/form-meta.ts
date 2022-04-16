import { BasicActionMeta } from '../actions/actions';
import { ActionsPosition } from './form-actions-position';
import { UpdateStrategy } from './form-update-strategy';

export type FormSpec = {
  updateStrategy: UpdateStrategy;
  actionPositions: ActionsPosition;
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
  actionPositions: ActionsPosition;
  updateStrategy: UpdateStrategy;

  constructor(formSpec?: FormSpec) {
    this.actions = [];
    this.actionPositions = formSpec
      ? formSpec.actionPositions
      : ActionsPosition.GRID_FLOW;
    this.updateStrategy = formSpec
      ? formSpec.updateStrategy
      : UpdateStrategy.ON_CHANGE;
  }
}
