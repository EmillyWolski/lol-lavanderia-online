import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';
import { PessoaFuncionarioService } from '../../services/pessoa-funcionario/pessoa-funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFuncionarioService {
  constructor(private pessoaFuncionarioService: PessoaFuncionarioService) {}

  login(email: string, senha: string): Observable<PessoaFuncionario | null> {
    // Obtenha a lista de todos os funcionários cadastrados
    const funcionarios = this.pessoaFuncionarioService.listarFuncionarios();
  
    // Verifique se há um funcionário com o email e senha fornecidos
    const funcionario = funcionarios.find(f => f.email && f.email.toLowerCase() === email.toLowerCase() && f.senha === senha);
  
    // Retorna o funcionário se encontrado, caso contrário, null
    return of(funcionario || null);
  }
}
