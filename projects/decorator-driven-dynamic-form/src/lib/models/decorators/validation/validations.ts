import { ValidatorFn } from '@angular/forms';

export type ValidationSpec = {
  errorName: string;
  errorMessage: string;
  validatorFn: ValidatorFn;
};
