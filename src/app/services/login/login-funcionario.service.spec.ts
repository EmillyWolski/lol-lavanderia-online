import { TestBed } from '@angular/core/testing';

import { LoginFuncionarioService } from './login-funcionario.service';

describe('LoginFuncionarioService', () => {
  let service: LoginFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
