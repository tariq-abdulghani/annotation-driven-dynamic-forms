import { InputDescription } from '../../types/inputs/input-description';
import {
  TextInputSpec,
  NumberInputSpec,
  DateInputSpec,
  SelectInputSpec,
  CheckInputSpec,
  RadioButtonsSpec,
} from '../../types/inputs/input-specs';
import { InputTypes } from '../../types/inputs/input-types.enum';
import { MetaDataRegisterer } from '../../../utils/meta-data-registerer';

export function TextControl(specs: TextInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new InputDescription(specs, InputTypes.TEXT)
    );
  };
}

export function NumberControl(specs: NumberInputSpec) {
  return function (target: any, propertyKey: string) {
    specs.type = 'number';
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new InputDescription(specs, InputTypes.NUMBER)
    );
  };
}

export function DateControl(specs: DateInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new InputDescription(specs, InputTypes.DATE)
    );
  };
}

export function SelectControl(specs: SelectInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new InputDescription(specs, InputTypes.SELECT)
    );
  };
}

export function CheckboxControl(specs: CheckInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new InputDescription(specs, InputTypes.CHECKBOX)
    );
  };
}

export function RadioButtonsControl(specs: RadioButtonsSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new InputDescription(specs, InputTypes.RADIO_BUTTONS)
    );
  };
}