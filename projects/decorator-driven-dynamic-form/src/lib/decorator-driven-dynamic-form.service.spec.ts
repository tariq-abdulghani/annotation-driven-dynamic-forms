import { TestBed } from '@angular/core/testing';

import { DecoratorDrivenDynamicFormService } from './decorator-driven-dynamic-form.service';

describe('DecoratorDrivenDynamicFormService', () => {
  let service: DecoratorDrivenDynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoratorDrivenDynamicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
