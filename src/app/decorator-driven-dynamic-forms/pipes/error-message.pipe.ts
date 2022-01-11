import { Pipe, PipeTransform } from '@angular/core';
import { ControlDescriptor } from '../models/types/controls-descriptors.ts';
import {MessageStringInterpolation} from "../utils/message-string-interpolation";

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: ControlDescriptor): string | null {
    if (value.formControl.errors) {
      let errorString: string| null = null;
      const key = Object.keys(value.formControl.errors)[0];
      errorString = value.errorMap?.get(key) || '';
      // console.log(errorString, key, value.formControl.errors, value.formControl.errors[key]);
      return  MessageStringInterpolation.interpolate(errorString, value.formControl.errors[key]);
    } else {
      return null;
    }
  }
}
