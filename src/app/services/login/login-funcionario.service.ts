import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginFuncionarioService {
  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<PessoaFuncionario | null> {
    const url = "http://localhost:8080/funcionarios";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, senha };

    return this.http.post<PessoaFuncionario>(url, body, { headers }).pipe(
      map(funcionario => funcionario || null),
      catchError(error => {
        console.error('Erro no login:', error);
        return of(null);
      })
    );
  }
}
