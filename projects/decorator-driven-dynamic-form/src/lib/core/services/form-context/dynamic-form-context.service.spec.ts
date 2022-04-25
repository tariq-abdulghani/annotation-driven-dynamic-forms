import { TestBed } from '@angular/core/testing';

import { DynamicFormContextService } from './dynamic-form-context.service';

describe('DynamicFormContextService', () => {
  let service: DynamicFormContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
