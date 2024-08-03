import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from '../shared/models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PecaRoupaQntService {
  private readonly API = 'http://localhost:8080/pedidos'; // Alterado para a API de pedidos
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'response'
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

  listarTodos(): Observable<Pedido[] | null> {
    return this.http.get<Pedido[]>(this.API, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Pedido[]>) => {
        if (response.status === 200) {
          return response.body || [];
        } else {
          return [];
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of([]);
        } else {
          return throwError(() => new Error(`Erro ao listar pedidos: ${error.message}`));
        }
      })
    );
  }

  inserir(pedido: Pedido): Observable<Pedido | null> {
    return this.http.post<Pedido>(this.API, pedido, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Pedido>) => {
        if (response.status === 201) {
          return response.body;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao inserir pedido: ${error.message}`));
      })
    );
  }

  buscarPorId(id: number): Observable<Pedido | null> {
    return this.http.get<Pedido>(`${this.API}/${id}`).pipe(
      map((response: Pedido) => response || null),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        } else {
          return throwError(() => new Error(`Erro ao buscar pedido por ID: ${error.message}`));
        }
      })
    );
  }

  atualizar(pedido: Pedido): Observable<Pedido | null> {
    return this.http.put<Pedido>(`${this.API}/${pedido.idpedido}`, pedido, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Pedido>) => {
        if (response.status === 200) {
          return response.body;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao atualizar pedido: ${error.message}`));
      })
    );
  }

  remover(id: number): Observable<void | null> {
    return this.http.delete<void>(`${this.API}/${id}`, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<void>) => {
        if (response.status === 200) {
          return null;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao remover pedido: ${error.message}`));
      })
    );
  }

  removertudo(): Observable<void | null> {
    return this.http.delete<void>(this.API, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<void>) => {
        if (response.status === 200) {
          return null;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao remover todos os pedidos: ${error.message}`));
      })
    );
  }
}
