import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Usuario } from '../shared/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  BASE_URL = 'http://localhost:8080/usuarios';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Usuario[] | null> {
    return this.httpClient.get<Usuario[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resp: HttpResponse<Usuario[]>) => {
        if (resp.status == 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        if (err.status == 404) {
          return of([]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  buscarPorId(id: number): Observable<Usuario | null> {
    return this.httpClient
      .get<Usuario>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Usuario>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  inserir(usuario: Usuario): Observable<Usuario | null> {
    return this.httpClient
      .post<Usuario>(this.BASE_URL, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Usuario>) => {
          if (resp.status == 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  remover(id: number): Observable<Usuario | null> {
    return this.httpClient
      .delete<Usuario>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Usuario>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  alterar(usuario: Usuario): Observable<Usuario | null> {
    return this.httpClient
      .put<Usuario>(
        this.BASE_URL + '/' + usuario.id,
        JSON.stringify(usuario),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Usuario>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
