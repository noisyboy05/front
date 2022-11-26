import { TestBed } from '@angular/core/testing';

import { DnisService } from './dnis.service';

describe('DnisService', () => {
  let service: DnisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DnisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
