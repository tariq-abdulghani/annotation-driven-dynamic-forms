import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { ControlTypes } from "./control-types.enum";
import { DateControlMeta } from "./controls-meta";

export function SplittedDateRangeControl(metaData: {
  startDateInputName: string;
  startDateInputId: string;
  startDateInputPlaceHolder?: string;
  startDateInputLabel?: string;
  endDateInputName: string;
  endDateInputId: string;
  endDateInputPlaceHolder?: string;
  endDateInputLabel?: string;
  rangeStartDate: Date;
  rangeEndDate: Date;
  optional?: boolean;
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}) {
  return function (target: any, propertyKey: string) {
    // console.log("splitted date decorator runs");
    const endDateMeta: DateControlMeta  = {
      type: 'date',
      name: metaData.endDateInputName,
      propertyKey: metaData.endDateInputName,
      minDate: metaData.rangeStartDate,
      maxDate: metaData.rangeEndDate,
      controlType: ControlTypes.Date,
      formControl: new FormControl(metaData.rangeStartDate, [maxDateValidator(metaData.rangeEndDate), optionalValidator(metaData.optional || false)]),
      width: metaData.width || 6,
      style: metaData.style,
      class: metaData.class,
      validators:[],
      id: metaData.endDateInputId,
      placeHolder: metaData.endDateInputPlaceHolder,
      label: metaData.endDateInputLabel,
    }

    const endDateSetter = (n: Date) => {
      endDateMeta.formControl.setValue(n);
    }
    const endDateGetter = () => {
      return endDateMeta.formControl.value;
    }

    Reflect.defineMetadata(metaData.endDateInputName, endDateMeta, target, metaData.endDateInputName);


    const startDateMeta: DateControlMeta = {
      type: 'date',
      name: metaData.startDateInputName,
      propertyKey: metaData.startDateInputName,
      minDate: metaData.rangeStartDate,
      maxDate: metaData.rangeEndDate,
      controlType: ControlTypes.Date,
      formControl: new FormControl(metaData.rangeStartDate,
        [minDateValidator(metaData.rangeStartDate),
        maxDateValidator(metaData.rangeEndDate),
        optionalValidator(metaData.optional || false)]
        ),
        validators:[],
      id: metaData.startDateInputId,
      placeHolder: metaData.startDateInputPlaceHolder,
      label: metaData.startDateInputLabel,
      width: metaData.width || 6,
      style: metaData.style,
      class: metaData.class,
    }

    const startDateSetter = (n: Date) => {
      // console.log("start date setter", n);
      endDateMeta.minDate = n;
      startDateMeta.formControl.setValue(n);
    }
    const startDateGetter = () => {
      return startDateMeta.formControl.value;
    }

    Object.defineProperty(target, metaData.startDateInputName, {
      set: startDateSetter,
      get: startDateGetter,
      enumerable: true,
    });

    startDateMeta.formControl
    .valueChanges.subscribe((n: any) => {
      endDateMeta.minDate = new Date(n);
      endDateMeta.formControl.setValue(endDateMeta.minDate);
      endDateMeta.formControl.setValidators([
        minDateValidator(endDateMeta.minDate), 
        maxDateValidator(metaData.rangeEndDate), 
        optionalValidator(metaData.optional || false)
      ]);
      endDateMeta.formControl.updateValueAndValidity();
    });

    Reflect.defineMetadata(metaData.startDateInputName, startDateMeta, target, metaData.startDateInputName);
    Object.defineProperty(target, metaData.endDateInputName, {
      set: endDateSetter,
      get: endDateGetter,
      enumerable: true,
    });


    const setter = function (val?: any) {
      if (Array.isArray(val) && val.length == 2) {
        startDateSetter(val[0]);
        endDateSetter(val[1]);
      } else {
        throw new Error(`value "${val}" must be array of two fields that are dates or nulls or valid sate string`);
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

const optionalValidator = function (optional: boolean): ValidatorFn {
  return function (control: AbstractControl) {
    if (optional || control.value ) {
      return null;
    } else{
      return {
        error: "required",
      }
    }
  }
}

const minDateValidator = function (minVal: Date): ValidatorFn {
  return function (control: AbstractControl) {
    const err = { error: "minDate", value: control.value, min: minVal }
    if (control.value == null) {
      return null;
    }
    if (typeof control.value == 'string') {
      let controlValue = new Date(control.value);
      if (controlValue.valueOf() != NaN && (controlValue >= minVal)) {
        return null;
      } else {
        return err;
      }
    } else {
      return control.value >= minVal ? null : err;
    }
  }
}

const maxDateValidator = function (maxVal: Date): ValidatorFn {
  return function (control: AbstractControl) {
    // console.log("max date validator", maxVal, control.value);
    const err = { error: "maxDate", value: control.value, max: maxVal };
    if (control.value == null) {
      return null;
    }
    if (typeof control.value == 'string') {
      let controlValue = new Date(control.value);
      if (controlValue.valueOf() != NaN && controlValue <= maxVal) {
        return null;
      } else {
        return err
      }
    } else {
      return (control.value <= maxVal) ? null : err
    }
  }
}

/**
 * Formats given date using given string template
 * 
 * @param date Date
 * @param formatString string contains yyyy mm dd h m s
 * @returns formatString after replacing yyyy by year and mm by month and dd by day HH by hour MM minutes SS seconds
 */
function formatDate(date: Date, formatString: string){
  return formatString
  .replace('yyyy', date.getFullYear().toString())
  .replace('mm', date.getMonth().toString().padStart(2, '0'))
  .replace('dd', date.getDate().toString().padStart(2, '0'))
  .replace('HH', date.getHours().toString().padStart(2, '0'))
  .replace('MM', date.getMinutes().toString().padStart(2, '0'))
  .replace('SS', (date.getSeconds().toString().padStart(2, '0')))
}