import { TestBed } from '@angular/core/testing';

import { AuthFreeViewGuard } from './auth-free-view.guard';

describe('AuthFreeViewGuard', () => {
  let guard: AuthFreeViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthFreeViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
