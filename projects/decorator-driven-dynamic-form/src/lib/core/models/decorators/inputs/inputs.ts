import {
  TextInputSpec,
  NumberInputSpec,
  DateInputSpec,
  SelectInputSpec,
  CheckInputSpec,
  RadioButtonsSpec,
  CustomInputSpec,
} from '../../types/inputs/input-specs';
import { InputTypes } from '../../types/inputs/input-types.enum';
import { InputsMetaData } from './inputs-meta-data';
import { NestedFormSpec } from '../../types/forms/form-meta';

export function TextControl(specs: TextInputSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.TEXT },
      target,
      propertyKey
    );
  };
}

export function NumberControl(specs: NumberInputSpec) {
  return function (target: any, propertyKey: string) {
    specs.type = 'number';
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.NUMBER, type: 'number' },
      target,
      propertyKey
    );
  };
}

export function DateControl(specs: DateInputSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.DATE },
      target,
      propertyKey
    );
  };
}

export function SelectControl(specs: SelectInputSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.SELECT },
      target,
      propertyKey
    );
  };
}

export function CheckboxControl(specs: CheckInputSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.CHECKBOX },
      target,
      propertyKey
    );
  };
}

export function RadioButtonsControl(specs: RadioButtonsSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.RADIO_BUTTONS },
      target,
      propertyKey
    );
  };
}

export function NestedFormEntity(specs: NestedFormSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: InputTypes.COMPOSITE },
      target,
      propertyKey
    );
  };
}

export function CustomControl(specs: CustomInputSpec) {
  return function (target: any, propertyKey: string) {
    InputsMetaData.add(
      { ...specs, inputType: specs.inputType.toUpperCase() },
      target,
      propertyKey
    );
  };
}
