import { TestBed } from '@angular/core/testing';

import { MtDestinationsService } from './mt-destinations.service';

describe('MtDestinationsService', () => {
  let service: MtDestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtDestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
