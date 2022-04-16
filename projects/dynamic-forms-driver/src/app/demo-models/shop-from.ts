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
  Max,
  AsyncValidation,
} from 'decorator-driven-dynamic-form';
import { CrossValidation } from 'decorator-driven-dynamic-form';
import { AsyncValidatorService } from '../servicies/async-validator';
import { UserData } from './user-data';
@CrossValidation({
  errorName: 'expirationRange',
  effects: [
    {
      input: 'expiryDate',
      message: 'expiration range cant be larger than 2 years',
    },
    {
      input: 'productionDate',
      message: 'expiration range cant be larger than 2 years',
    },
  ],
  validatorFn: (control: AbstractControl) => {
    const expiryDate = control.get('expiryDate');
    const productionDate = control.get('productionDate');
    if (
      new Date(expiryDate?.value).getFullYear() -
        new Date(productionDate?.value).getFullYear() >
      2
    ) {
      expiryDate?.setErrors({ expirationRange: true });
      productionDate?.setErrors({ expirationRange: true });
      return { expirationRange: true };
    }
    return null;
  },
})
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
  updateStrategy: UpdateStrategy.ON_PLUR,
  labelStyling: LabelStyling.FLOAT,
})
export class ShopForm {
  @AsyncValidation({
    errorName: 'shit',
    errorMessage: 'shit is bad!!',
    validator: { provider: AsyncValidatorService },
    // validator: (abs: AbstractControl) => {
    //   return new Promise<any>((resolve: any) => {
    //     setTimeout(() => resolve({ shit: true }), 10000);
    //   });
    // },
  })
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

  @Max({ message: 'cant be larger than 1000', maxValue: 1000 })
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
