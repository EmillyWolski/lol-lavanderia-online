import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PecaRoupaQuantidade } from '../shared/models/peca-roupa-quantidade.model';

@Injectable({
  providedIn: 'root',
})
export class PecaRoupaQntService {
  private readonly API = 'http://localhost:8080/pedidos'; 
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PecaRoupaQuantidade[]> {
    return this.http.get<PecaRoupaQuantidade[]>(this.API, this.httpOptions).pipe(
      map((resp: any) => {
        if (resp.status === 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of([]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  inserir(pecaRoupaQnt: PecaRoupaQuantidade): Observable<PecaRoupaQuantidade | null> {
    return this.http.post<PecaRoupaQuantidade>(this.API, pecaRoupaQnt, this.httpOptions).pipe(
      map((resp: any) => {
        if (resp.status === 201) {
          return resp.body;
        } else {
          return null; 
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return of(null);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  atualizar(pecaRoupaQnt: PecaRoupaQuantidade): Observable<void> {
    return this.http.put<void>(`${this.API}/${pecaRoupaQnt.id}`, pecaRoupaQnt, this.httpOptions).pipe(
      map((resp: any) => {
        if (resp.status === 200) {
          return;
        } else {
          throw new Error('Erro ao atualizar a peça de roupa');
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of(void 0);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, this.httpOptions).pipe(
      map((resp: any) => {
        if (resp.status === 204) {
          return;
        } else {
          throw new Error('Erro ao remover a peça de roupa');
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of(void 0);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  buscarPorId(id: number): Observable<PecaRoupaQuantidade | null> {
    return this.http.get<PecaRoupaQuantidade>(`${this.API}/${id}`, this.httpOptions).pipe(
      map((resp: any) => {
        if (resp.status === 200) {
          return resp.body;
        } else {
          return null; 
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of(null);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
