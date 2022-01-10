import { Pipe, PipeTransform } from '@angular/core';
import { ControlDescriptor } from '../dynamic-forms/dynamic-form/models/types/controls-descriptors.ts';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: ControlDescriptor): string | null {
    if (value.formControl.errors) {
      const errorString: string[] = [];
      Object.keys(value.formControl.errors).forEach((key) => {
        errorString.push(value.errorMap?.get(key) || '');
      });
      // console.log(errorString);
      return errorString.join(',');
    } else {
      return null;
    }
  }
}
