import { Pipe, PipeTransform } from '@angular/core';
import { ControlDescription } from '../models/types/controls-meta/control-description';
import { MessageStringInterpolation } from '../utils/message-string-interpolation';

@Pipe({
  name: 'errorMessage',
  pure: false,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: ControlDescription): string | null {
    if (value?.formControl?.errors) {
      let errorString: string | null = null;
      const key = Object.keys(value.formControl.errors)[0];
      errorString = value.errorMap?.get(key) || '';
      // console.log(errorString, key, value.formControl.errors, value.formControl.errors[key]);
      return MessageStringInterpolation.interpolate(
        errorString,
        value.formControl.errors[key]
      );
    } else {
      return null;
    }
  }
}
