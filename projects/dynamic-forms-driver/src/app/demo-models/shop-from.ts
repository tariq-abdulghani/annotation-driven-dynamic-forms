import { AbstractControl } from '@angular/forms';
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
  Button,
} from 'decorator-driven-dynamic-form';
import { CrossValidation } from 'decorator-driven-dynamic-form';
import { UserData } from './user-data';

@CrossValidation({
  errorName: 'expirationDate',
  effects: [
    {
      input: 'expiryDate',
      message: 'expiration date cant be less than production date',
    },
  ],
  validatorFn: (control: AbstractControl) => {
    const expiryDate = control.get('expiryDate');
    const productionDate = control.get('productionDate');
    if (new Date(expiryDate?.value) <= new Date(productionDate?.value)) {
      expiryDate?.setErrors({ expirationDate: true });
      return { expirationDate: true };
    }
    return null;
  },
})
@Button({ label: 'cancel', id: 'cancel', class: 'btn btn-danger' })
@Button({ label: 'print', id: 'print', class: 'btn btn-light' })
@Submit({ label: 'ok', id: 'so' })
@Reset({ label: 'clear', id: 'do' })
@FormEntity({
  actionPositions: ActionsPosition.NEW_LINE_END,
  updateStrategy: UpdateStrategy.ON_SUBMIT,
  labelStyling: LabelStyling.FLOAT,
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
  shopName: string | null | undefined = 'job';

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
    type: 'date',
    label: 'expiry date',
  })
  expiryDate: string | null = '01-09-2023';

  @DateControl({
    id: 'productionDate',
    name: 'productionDate',
    type: 'date',
    label: 'production date',
  })
  productionDate: string | null = '01-01-2023';

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
    inputWidth: 6,
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
  userData: UserData | null = null;
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
