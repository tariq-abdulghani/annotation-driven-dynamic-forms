import {
  FormEntity,
  DateControl,
  Submit,
  ActionsPosition,
  LabelStyling,
  UpdateStrategy,
} from 'decorator-driven-dynamic-form';

@Submit({ label: 'search' })
// @Reset({ label: 'clear' })
@FormEntity({
  actionPositions: ActionsPosition.GRID_FLOW,
  updateStrategy: UpdateStrategy.ACTION,
  labelStyling: LabelStyling.TOP,
})
export class InlineSearchForm {
  @DateControl({
    id: 'date',
    name: 'date',
    type: 'date',
    width: 6,
  })
  date: string | null = null;
}
