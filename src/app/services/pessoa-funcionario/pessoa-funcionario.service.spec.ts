import { TestBed } from '@angular/core/testing';

import { PessoaFuncionarioService } from './pessoa-funcionario.service';

describe('PessoaFuncionarioService', () => {
  let service: PessoaFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
