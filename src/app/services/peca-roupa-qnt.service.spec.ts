import { TestBed } from '@angular/core/testing';

import { PecaRoupaQntService } from './peca-roupa-qnt.service';

describe('PecaRoupaQntService', () => {
  let service: PecaRoupaQntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PecaRoupaQntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
