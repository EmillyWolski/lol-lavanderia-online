import { TestBed } from '@angular/core/testing';

import { ConsultarPedidoService } from './consultar-pedido.service';

describe('ConsultarPedidoService', () => {
  let service: ConsultarPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
