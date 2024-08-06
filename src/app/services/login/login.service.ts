import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Pessoa } from '../../shared/models/pessoa.model';
import { AutocadastroService } from '../../services/autocadastro/autocadastro.service';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/models/usuario.model';
import { Login } from '../../shared/models/login.model';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = 'http://localhost:8080/login';
  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  /*
  faz a requisição para o back enviando um objeto login(email/senha) e o back retorna um ok se existir e devolve o usuario que corresponde esse login.
  Esse usuário vai conter um atributo dizendo se é cliente ou funcionario
  */
  login(login: Login): Observable<Usuario | null> {
    return this.httpClient
      .post<Usuario>(this.BASE_URL, JSON.stringify(login), this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Usuario>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          if (err.status == 401) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  /*
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
  */
}
