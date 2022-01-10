import { FormControl } from '@angular/forms';
import { ControlTypes } from '../../types/control-types.enum';
import { DateControlDescriptor } from '../../types/controls-descriptors.ts';
import { SplittedDateRangeMeta } from './splitted-date-range-meta';
import {
  maxDateValidator,
  optionalValidator,
  minDateValidator,
} from './splitted-date-validators';

export function SplittedDateRangeControl(metaData: SplittedDateRangeMeta) {
  return function (target: any, propertyKey: string) {
    // console.log("splitted date decorator runs");

    const [startDateDescriptor, endDateDescriptor] =
      generateSplittedDatesDescriptors(metaData);

    const endDateSetter = (n: Date) => {
      endDateDescriptor.formControl.setValue(n);
    };
    const endDateGetter = () => {
      return endDateDescriptor.formControl.value;
    };

    Reflect.defineMetadata(
      metaData.endDate.name,
      endDateDescriptor,
      target,
      metaData.endDate.name
    );

    const startDateSetter = (n: Date) => {
      // console.log("start date setter", n);
      endDateDescriptor.minDate = n;
      startDateDescriptor.formControl.setValue(n);
    };
    const startDateGetter = () => {
      return startDateDescriptor.formControl.value;
    };

    Object.defineProperty(target, metaData.startDate.name, {
      set: startDateSetter,
      get: startDateGetter,
      enumerable: true,
    });

    startDateDescriptor.formControl.valueChanges.subscribe((n: any) => {
      endDateDescriptor.minDate = new Date(n);
      endDateDescriptor.formControl.setValue(endDateDescriptor.minDate);
      endDateDescriptor.formControl.setValidators([
        minDateValidator(endDateDescriptor.minDate),
        maxDateValidator(metaData.to),
        optionalValidator(metaData.optional || false),
      ]);
      endDateDescriptor.formControl.updateValueAndValidity();
    });

    Reflect.defineMetadata(
      metaData.startDate.name,
      startDateDescriptor,
      target,
      metaData.startDate.name
    );
    Object.defineProperty(target, metaData.endDate.name, {
      set: endDateSetter,
      get: endDateGetter,
      enumerable: true,
    });

    const setter = function (val?: any) {
      if (Array.isArray(val) && val.length == 2) {
        startDateSetter(val[0]);
        endDateSetter(val[1]);
      } else {
        throw new Error(
          `value "${val}" must be array of two fields that are dates or nulls or valid sate string`
        );
      }
    };

    const getter = function () {
      return [startDateGetter(), endDateGetter()];
    };

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
      enumerable: true,
    });
  };
}

function generateSplittedDatesDescriptors(
  metaData: SplittedDateRangeMeta
): [DateControlDescriptor, DateControlDescriptor] {
  const startDateMeta: DateControlDescriptor = {
    type: 'date',
    name: metaData.startDate.name,
    propertyKey: metaData.startDate.name,
    minDate: metaData.from,
    maxDate: metaData.to,
    controlType: ControlTypes.Date,
    formControl: new FormControl(metaData.from, [
      minDateValidator(metaData.from),
      maxDateValidator(metaData.to),
      optionalValidator(metaData.optional || false),
    ]),
    validators: [],
    id: metaData.startDate.id,
    placeHolder: metaData.startDate.placeHolder,
    label: metaData.startDate.label,
    width: metaData.width || 6,
    style: metaData.style,
    class: metaData.class,
  };

  const endDateMeta: DateControlDescriptor = {
    type: 'date',
    name: metaData.endDate.name,
    propertyKey: metaData.endDate.name,
    minDate: metaData.from,
    maxDate: metaData.to,
    controlType: ControlTypes.Date,
    formControl: new FormControl(metaData.from, [
      maxDateValidator(metaData.to),
      optionalValidator(metaData.optional || false),
    ]),
    width: metaData.width || 6,
    style: metaData.style,
    class: metaData.class,
    validators: [],
    id: metaData.endDate.id,
    placeHolder: metaData.endDate.placeHolder,
    label: metaData.endDate.label,
  };
  return [startDateMeta, endDateMeta];
}
