import { Pipe, PipeTransform } from '@angular/core';
import { InputDescription } from '../models/types/inputs/input-description';
import { InputSpec } from '../models/types/inputs/input-specs';
import { MessageStringInterpolation } from '../utils/message-string-interpolation';

@Pipe({
  name: 'errorMessage',
  pure: false,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: InputDescription): string | null {
    if (value?.control?.errors) {
      let errorString: string | null = null;
      const key = Object.keys(value.control.errors)[0];
      errorString = value.errorMap?.get(key) || '';
      // console.log(errorString, key, value.formControl.errors, value.formControl.errors[key]);
      return MessageStringInterpolation.interpolate(
        errorString || '',
        value.control.errors[key]
      );
    } else {
      return null;
    }
  }
}
