import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PecaRoupaQuantidade } from '../shared/models/peca-roupa-quantidade.model';

@Injectable({
  providedIn: 'root',
})
export class PecaRoupaQntService {
  private readonly API = 'http://localhost:8080/pecasRoupaQnt';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PecaRoupaQuantidade[]> {
    return this.http.get<PecaRoupaQuantidade[]>(this.API, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  inserir(pecaRoupaQnt: PecaRoupaQuantidade): Observable<PecaRoupaQuantidade> {
    return this.http.post<PecaRoupaQuantidade>(this.API, pecaRoupaQnt, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  atualizar(pecaRoupaQnt: PecaRoupaQuantidade): Observable<void> {
    return this.http.put<void>(`${this.API}/${pecaRoupaQnt.id}`, pecaRoupaQnt, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  buscarPorId(id: number): Observable<PecaRoupaQuantidade> {
    return this.http.get<PecaRoupaQuantidade>(`${this.API}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
