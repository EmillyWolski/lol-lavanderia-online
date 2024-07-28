import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from '../../shared/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultarPedidoService {
  private readonly API = 'http://localhost:8080/pedidos';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Erro: ${error.error.message}';
    } else {
      errorMessage = 'Código do erro: ${error.status}\nMensagem: ${error.message}';
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Método para buscar pedidos pelo ID
  buscarPedidoPorId(id: number): Observable<Pedido | null> {
    return this.http.get<Pedido>('${this.API}/${id}', this.httpOptions).pipe(
      map((pedido) => pedido ? pedido : null),
      catchError((err) => {
        if (err.status === 404) {
          return of(null);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}