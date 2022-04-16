import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsyncValidatorService implements AsyncValidator {
  constructor() {
    this.validate = this.validate.bind(this);
    this.delay = this.delay.bind(this);
  }
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('validator ......', this);
    return this.delay(10000, { shit: true });
  }

  delay(t: number, error: null | any) {
    console.log(t);
    return new Promise<any>((resolve: any) => {
      setTimeout(() => resolve(error), t);
    });
  }
}
