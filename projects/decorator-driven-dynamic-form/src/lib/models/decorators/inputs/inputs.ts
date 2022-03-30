import {
  TextInputSpec,
  TextInputDescription,
  NumberInputSpec,
  NumberInputDescription,
  DateInputSpec,
  DateInputDescription,
  SelectInputSpec,
  SelectInputDescription,
  CheckInputSpec,
  CheckboxInputDescription,
  RadioButtonsSpec,
  RadioButtonsInputDescription,
} from '../../types/inputs-meta/input-specs';
import { MetaDataRegisterer } from '../../types/inputs-meta/meta-data-registerer';

export function TextControl(specs: TextInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new TextInputDescription(specs)
    );
  };
}

export function NumberControl(specs: NumberInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new NumberInputDescription(specs)
    );
  };
}

export function DateControl(specs: DateInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new DateInputDescription(specs)
    );
  };
}

export function SelectControl(specs: SelectInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new SelectInputDescription(specs)
    );
  };
}

export function CheckboxControl(specs: CheckInputSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new CheckboxInputDescription(specs)
    );
  };
}

export function RadioButtonsControl(specs: RadioButtonsSpec) {
  return function (target: any, propertyKey: string) {
    MetaDataRegisterer.add(
      target,
      propertyKey,
      new RadioButtonsInputDescription(specs)
    );
  };
}
