import { AbstractControl, Validators } from '@angular/forms';
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
  UpdateStrategy,
  FormValueTransformer,
  LabelStyling,
} from 'decorator-driven-dynamic-form';
import { CrossValidation } from 'decorator-driven-dynamic-form';
import { UserData } from './user-data';

@CrossValidation({
  id: 'shop',
  message: 'capacity cant be less than 20 when name is andrew!!',
  inputs: [
    {
      input: 'capacity',
      errorConfig: { err: 'shop', message: 'capacity cant be less than .....' },
    },
  ],
  validatorFn: (control: AbstractControl) => {
    return { shop: true };
  },
})
@Submit({ label: 'ok' })
@Reset({ label: 'clear' })
@FormEntity({
  actionPositions: ActionsPosition.NEW_LINE_CENTER,
  updateStrategy: UpdateStrategy.ACTION,
  labelStyling: LabelStyling.TOP,
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
    placeHolder: '...',
    width: 6,
  })
  capacity: number | null = 200;

  @DateControl({
    id: 'expiryDate',
    name: 'expiryDate',
    type: 'week',
    label: 'expiry date',
    placeHolder: 'week 10, 2022',
  })
  expiryDate: string | null = '01-01-2023';

  @CheckboxControl({
    id: 'rememberMe',
    name: 'rememberMe',
    label: 'remember Me',
    width: 7,
  })
  rememberMe: boolean | null = false;
  @CheckboxControl({
    id: 'callMe',
    name: 'callMe',
    label: 'call Me',
    width: 7,
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
    width: 6,
    inputWidth: 12,
    dataSource: [
      { id: 1, description: 'visa' },
      { id: 2, description: 'cash' },
    ],
    legend: 'Payment Method',
  })
  paymentMethod: any = null;

  @NestedFormEntity({
    declaredClass: UserData,
    legend: 'User Data',
    name: 'userData',
    width: 12,
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
