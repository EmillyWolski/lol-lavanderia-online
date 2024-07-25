import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pessoa } from '../../shared/models/pessoa.model';
import { AutocadastroService } from '../../services/autocadastro/autocadastro.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private pessoaLogada: Pessoa | null = null; // Para armazenar a pessoa logada

  constructor(private autocadastroService: AutocadastroService, private router: Router) {}

  login(email: string, senha: string): Observable<Pessoa | null> {
    // Obtém a lista de todas as pessoas cadastradas
    const pessoas = this.autocadastroService.listarTodos();
  
    // Verifica se há uma pessoa com o email e senha fornecidos
    const pessoa = pessoas.find(p => p.email && p.email.toLowerCase() === email.toLowerCase() && p.senha === senha);
    
    // Armazena a pessoa logada
    this.pessoaLogada = pessoa || null;
    if (this.pessoaLogada) {
      localStorage.setItem('pessoaLogadaId', this.pessoaLogada.id.toString());
    }
    return of(this.pessoaLogada);
    
  }  

  getPessoaLogada(): Pessoa | null {
    const pessoaLogadaId = localStorage.getItem('pessoaLogadaId');
    if (pessoaLogadaId) {
      const pessoas = this.autocadastroService.listarTodos();
      this.pessoaLogada = pessoas.find(p => p.id.toString() === pessoaLogadaId) || null;
    }
    return this.pessoaLogada;
  }

  logout(): void {
    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.pessoaLogada = null;
      localStorage.removeItem('pessoaLogadaId');
      this.router.navigate(['/inicio/login']);
    }
    // Não há necessidade de fazer nada se o usuário cancelar
  }
}