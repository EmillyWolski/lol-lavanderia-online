import { TestBed } from '@angular/core/testing';

import { RoupasService } from './roupas.service';

describe('RoupasService', () => {
  let service: RoupasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoupasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
