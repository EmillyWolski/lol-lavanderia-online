import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Pessoa } from '../../shared/models/pessoa.model';
import { AutocadastroService } from '../../services/autocadastro/autocadastro.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private pessoaLogada: Pessoa | null = null; // Para armazenar a pessoa logada

  constructor(private http: HttpClient, private autocadastroService: AutocadastroService, private router: Router) {}

  login(email: string, senha: string): Observable<Pessoa | null> {
    const url = "http://localhost:8080/clientes"; // URL do endpoint de login do cliente
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, senha };

    return this.http.post<Pessoa>(url, body, { headers }).pipe(
      map(pessoa => {
        this.pessoaLogada = pessoa || null;
        if (this.pessoaLogada) {
          localStorage.setItem('pessoaLogadaId', this.pessoaLogada.id.toString());
        }
        return this.pessoaLogada;
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        return of(null);
      })
    );
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
