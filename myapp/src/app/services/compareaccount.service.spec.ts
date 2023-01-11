import { TestBed } from '@angular/core/testing';

import { CompareaccountService } from './compareaccount.service';

describe('CompareaccountService', () => {
  let service: CompareaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
