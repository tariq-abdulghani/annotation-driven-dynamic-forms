import {
  FormEntity,
  TextControl,
  NumberControl,
  DateControl,
  CheckboxControl,
  SelectControl,
  RadioButtonsControl,
  NestedFormEntity,
  Submit,
  Reset,
  NotNull,
  ActionsPosition,
  Layout,
  UpdateStrategy,
  FormValueTransformer,
} from 'decorator-driven-dynamic-form';
import { LabelStyling } from 'projects/decorator-driven-dynamic-form/src/public-api';
import { UserData } from './user-data';

@Submit({ label: 'ok' })
@Reset({ label: 'clear' })
@FormEntity({
  actionPositions: ActionsPosition.GRID_FLOW,
  layout: Layout.GRID,
  updateStrategy: UpdateStrategy.ACTION,
  labelStyling: LabelStyling.START,
})
export class ShopForm {
  @NotNull({ message: 'shopName cant be null ?' })
  @TextControl({
    id: 'shopName',
    name: 'shopName',
    type: 'text',
    label: 'shop name',
    width: 6,
    placeHolder: 'asssss',
  })
  shopName: string | null | undefined = undefined;

  @NumberControl({
    id: 'capacity',
    name: 'capacity',
    label: 'capacity',
    width: 6,
  })
  capacity: number | null = 200;

  @DateControl({
    id: 'expiryDate',
    name: 'expiryDate',
    type: 'week',
    label: 'expiry date',
  })
  expiryDate: string | null = '01-01-2023';

  @CheckboxControl({
    id: 'rememberMe',
    name: 'rememberMe',
    label: 'remember Me',
    width: 6,
  })
  rememberMe: boolean | null = false;
  @CheckboxControl({
    id: 'callMe',
    name: 'callMe',
    label: 'call Me',
    width: 6,
  })
  callMe: boolean | null = false;

  @SelectControl({
    id: 'style',
    name: 'style',
    label: 'style',
    bindLabel: 'description',
    bindValue: null,
    placeHolder: 'wow',
    compareWith: (a, b) => false,
    dataSource: [
      { id: 1, description: 'visa' },
      { id: 2, description: 'cash' },
    ],
  })
  style: any | null = null;

  @RadioButtonsControl({
    id: 'paymentMethod',
    name: 'paymentMethod',
    label: 'paymentMethod',
    bindLabel: 'description',
    bindValue: null,
    dataSource: [
      { id: 1, description: 'visa' },
      { id: 2, description: 'cash' },
    ],
    legend: 'paymentMethod',
  })
  paymentMethod: any = null;

  @NestedFormEntity({
    declaredClass: UserData,
    legend: 'userData',
    name: 'userData',
  })
  userData: any = null;
}

export class ShopFormTransformer
  implements FormValueTransformer<ShopForm, any>
{
  transform(formValue: ShopForm) {
    console.log('tarnsformer is running');
    const transformedVal = {
      userInfo: formValue.userData,
      shopInfo: { name: formValue.shopName },
    };
    return transformedVal;
  }
}
