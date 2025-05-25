import { TestBed } from '@angular/core/testing';

import { RedisterService } from './redister.service';

describe('RedisterService', () => {
  let service: RedisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
