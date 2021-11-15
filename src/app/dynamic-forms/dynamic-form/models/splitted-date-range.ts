import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { ControlTypes } from "./control-types.enum";

export function splittedDateRangeControl(metaData: {
  startDateLabel: string;
  startDate: Date;
  endDateLabel: string;
  endDate: Date;
  optional?: boolean;
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}) {
  return function (target: any, propertyKey: string) {
    // console.log("splitted date decorator runs");
    const endDateMeta = {
      type: 'date',
      name: metaData.endDateLabel,
      propertyKey: metaData.endDateLabel,
      minDate: metaData.startDate,
      maxDate: metaData.endDate,
      controlType: ControlTypes.Date,
      formControl: new FormControl(metaData.startDate, [maxDateValidator(metaData.endDate), optionalValidator(metaData.optional || false)]),
      width: metaData.width,
      style: metaData.style,
      class: metaData.class,
    }

    const endDateSetter = (n: Date) => {
      endDateMeta.formControl.setValue(n);
    }
    const endDateGetter = () => {
      return endDateMeta.formControl.value;
    }

    Reflect.defineMetadata(metaData.endDateLabel, endDateMeta, target, metaData.endDateLabel);


    const startDateMeta = {
      type: 'date',
      name: metaData.startDateLabel,
      propertyKey: metaData.startDateLabel,
      minDate: metaData.startDate,
      maxDate: metaData.endDate,
      controlType: ControlTypes.Date,
      formControl: new FormControl(metaData.startDate,
        [minDateValidator(metaData.startDate),
        maxDateValidator(metaData.endDate),
        optionalValidator(metaData.optional || false)]),
      width: metaData.width,
      style: metaData.style,
      class: metaData.class,
    }

    const startDateSetter = (n: Date) => {
      console.log("start date setter", n);
      endDateMeta.minDate = n;
      startDateMeta.formControl.setValue(n);
    }
    const startDateGetter = () => {
      return startDateMeta.formControl.value;
    }

    Object.defineProperty(target, metaData.startDateLabel, {
      set: startDateSetter,
      get: startDateGetter,
      enumerable: true,
    });

    startDateMeta.formControl.valueChanges.subscribe(n => {
      endDateMeta.minDate = new Date(n);
      endDateMeta.formControl.setValue(endDateMeta.minDate);
      endDateMeta.formControl.setValidators([minDateValidator(endDateMeta.minDate), maxDateValidator(metaData.endDate), optionalValidator(metaData.optional || false)]);
      endDateMeta.formControl.updateValueAndValidity();
    });
    Reflect.defineMetadata(metaData.startDateLabel, startDateMeta, target, metaData.startDateLabel);
    Object.defineProperty(target, metaData.endDateLabel, {
      set: endDateSetter,
      get: endDateGetter,
      enumerable: true,
    });


    const setter = function (val?: any) {
      if (Array.isArray(val) && val.length == 2) {
        startDateSetter(val[0]);
        endDateSetter(val[1]);
      } else {
        throw new Error("value must be array of two fields ");
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
    console.log("max date validator", maxVal, control.value);
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