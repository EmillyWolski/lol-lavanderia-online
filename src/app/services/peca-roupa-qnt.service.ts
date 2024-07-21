import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PecaRoupaQuantidade } from '../shared/models/peca-roupa-quantidade.model';

@Injectable({
  providedIn: 'root',
})
export class PecaRoupaQntService {
  private readonly API = 'http://localhost:8080/pecasroupas';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  listarTodos(): Observable<PecaRoupaQuantidade[]> {
    return this.http.get<PecaRoupaQuantidade[]>(this.API).pipe(catchError(this.handleError));
  }

  inserir(pecaroupa: PecaRoupaQuantidade): Observable<void> {
    pecaroupa.id = new Date().getTime();
    return this.http.post<void>(this.API, pecaroupa, this.httpOptions).pipe(catchError(this.handleError));
  }

  buscarPorId(id: number): Observable<PecaRoupaQuantidade | undefined> {
    return this.http.get<PecaRoupaQuantidade>(`${this.API}/${id}`).pipe(catchError(this.handleError));
  }

  atualizar(pecaroupa: PecaRoupaQuantidade): Observable<void> {
    return this.http.put<void>(`${this.API}/${pecaroupa.id}`, pecaroupa, this.httpOptions).pipe(catchError(this.handleError));
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(catchError(this.handleError));
  }

  removertudo(): Observable<void> {
    return this.http.delete<void>(this.API).pipe(catchError(this.handleError));
  }
}
