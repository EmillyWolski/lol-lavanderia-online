import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pessoa } from '../../shared/models/pessoa.model';
import { AutocadastroService } from '../../services/autocadastro/autocadastro.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private autocadastroService: AutocadastroService) {}

  login(email: string, senha: string): Observable<Pessoa | null> {
    // Obtenha a lista de todas as pessoas cadastradas
    const pessoas = this.autocadastroService.listarTodos();
  
    // Verifique se há uma pessoa com o email e senha fornecidos
    const pessoa = pessoas.find(p => p.email && p.email.toLowerCase() === email.toLowerCase() && p.senha === senha);
  
    // Retorna a pessoa se encontrada, caso contrário, null
    return of(pessoa || null);
  }  
}