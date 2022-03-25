import { TestBed } from '@angular/core/testing';

import { FormEntityProcessorService } from './form-entity-processor.service';

describe('FormEntityProcessorService', () => {
  let service: FormEntityProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormEntityProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
