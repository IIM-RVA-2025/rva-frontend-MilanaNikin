import { TestBed } from '@angular/core/testing';

import { FakultetService } from './fakultet';

describe('Fakultet', () => {
  let service: FakultetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakultetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
