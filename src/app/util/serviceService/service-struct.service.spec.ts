import { TestBed } from '@angular/core/testing';

import { ServiceStructService } from './service-struct.service';

describe('ServiceStructService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceStructService = TestBed.get(ServiceStructService);
    expect(service).toBeTruthy();
  });
});
