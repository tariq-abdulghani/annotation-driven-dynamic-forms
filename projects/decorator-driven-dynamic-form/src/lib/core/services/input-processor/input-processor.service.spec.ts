import { TestBed } from '@angular/core/testing';

import { InputProcessorService } from './input-processor.service';

describe('InputProcessorService', () => {
  let service: InputProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
