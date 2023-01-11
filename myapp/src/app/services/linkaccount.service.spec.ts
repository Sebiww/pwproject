import { TestBed } from '@angular/core/testing';

import { LinkaccountService } from './linkaccount.service';

describe('LinkaccountService', () => {
  let service: LinkaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
