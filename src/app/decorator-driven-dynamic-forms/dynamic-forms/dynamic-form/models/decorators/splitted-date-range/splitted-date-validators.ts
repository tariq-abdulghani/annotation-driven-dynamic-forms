import { ValidatorFn, AbstractControl } from '@angular/forms';

export const optionalValidator = function (optional: boolean): ValidatorFn {
  return function (control: AbstractControl) {
    if (optional || control.value) {
      return null;
    } else {
      return {
        optional: false,
      };
    }
  };
};

export const minDateValidator = function (minVal: Date): ValidatorFn {
  return function (control: AbstractControl) {
    // const err = { error: 'minDate', value: control.value, min: minVal };
    const validationError = {
      minDate: { minDate: minVal, value: control.value },
    };
    if (control.value == null) {
      return null;
    }
    if (typeof control.value == 'string') {
      let controlValue = new Date(control.value);
      if (controlValue.valueOf() != NaN && controlValue >= minVal) {
        return null;
      } else {
        return validationError;
      }
    } else {
      return control.value >= minVal ? null : validationError;
    }
  };
};

export const maxDateValidator = function (maxVal: Date): ValidatorFn {
  return function (control: AbstractControl) {
    // console.log("max date validator", maxVal, control.value);
    // const err = { error: 'maxDate', value: control.value, max: maxVal };
    const validationError = {
      maxDate: { maxDate: maxVal, value: control.value },
    };
    if (control.value == null) {
      return null;
    }
    if (typeof control.value == 'string') {
      let controlValue = new Date(control.value);
      if (controlValue.valueOf() != NaN && controlValue <= maxVal) {
        return null;
      } else {
        return validationError;
      }
    } else {
      return control.value <= maxVal ? null : validationError;
    }
  };
};
