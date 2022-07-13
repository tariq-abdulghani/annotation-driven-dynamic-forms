import {ValidationsMetaData} from "./ValidationsMetaData";
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


export function MaxDate(errConfig: { message: string; maxDate: string | Date }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'maxDate',
        errorMessage: errConfig.message,
        validatorFn: DateValidation.max(errConfig.maxDate),
      },
      target,
      propertyKey
    );
  };
}

export function MinDate(errConfig: { message: string; minDate: string | Date }) {
  return function (target: any, propertyKey: string) {
    ValidationsMetaData.add(
      {
        errorName: 'minDate',
        errorMessage: errConfig.message,
        validatorFn: DateValidation.min(errConfig.minDate),
      },
      target,
      propertyKey
    );
  };
}

export  class DateValidation {

  public static max(value: string | Date): ValidatorFn{
    const max = DateValidation.parseDate(value);
    return (control: AbstractControl)=>{
      const dateVal = DateValidation.parseDate(control.value);
      if (dateVal <= max) return null;
      else return {maxDate: true};
    }
  }


  public static min(value: string | Date): ValidatorFn{
    const min = DateValidation.parseDate(value);
    return (control: AbstractControl)=>{
      const dateVal = DateValidation.parseDate(control.value);
      if (dateVal >= min) return null;
      else return {minDate: true};
    }
  }

  //
  // private static isValidDateString(date: string): boolean{
  //   return false;
  // }

  private static  parseDate(date:string|Date): Date{
    if(date == null ||( typeof date == 'string' && Date.parse(date) !== NaN)){
     return new Date(date);
    }else if (date instanceof Date) return date;
   else throw new Error("invalid date format " + date);
  }

}
