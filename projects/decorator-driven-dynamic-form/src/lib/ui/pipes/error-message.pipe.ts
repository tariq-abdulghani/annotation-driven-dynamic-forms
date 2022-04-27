import { Pipe, PipeTransform } from '@angular/core';
import { InputNode } from '../../core/models/types/inputs/input-node';
import { MessageStringInterpolation } from '../utils/message-string-interpolation';

@Pipe({
  name: 'errorMessage',
  pure: false,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: InputNode): string | null {
    const validationError = value.getControl().errors;
    if (validationError) {
      let errorString: string | null = null;
      const key = Object.keys(validationError)[0];
      errorString = value.getError(key) || '';
      return MessageStringInterpolation.interpolate(
        errorString || '',
        validationError[key]
      );
    } else {
      return null;
    }
  }
}
