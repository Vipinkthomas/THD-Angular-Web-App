import { TestBed } from '@angular/core/testing';

import { ThabellaService } from './thabella.service';

describe('ThabellaService', () => {
  let service: ThabellaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThabellaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
