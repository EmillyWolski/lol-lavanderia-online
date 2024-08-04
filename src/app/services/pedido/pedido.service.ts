import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';

interface HttpResponse<T> {
  status: number;
  body: T;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly API = 'http://localhost:8080/pedidos';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // Método para listar todos os pedidos
  listarTodos(): Observable<Pedido[] | null> {
    return this.http.get<HttpResponse<Pedido[]>>(this.API, this.httpOptions).pipe(
      map((resp) => {
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

  // Método para inserir um novo pedido
  inserir(pedido: Pedido): Observable<void | null> {
    return this.http.post<HttpResponse<void>>(this.API, pedido, this.httpOptions).pipe(
      map((resp) => {
        if (resp.status === 201) {
          return; // Pedido inserido com sucesso
        } else {
          return null; // Outro status
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  // Método para atualizar um pedido existente
  atualizar(pedido: Pedido): Observable<void | null> {
    return this.http.put<HttpResponse<void>>(`${this.API}/${pedido.idpedido}`, pedido, this.httpOptions).pipe(
      map((resp) => {
        if (resp.status === 200) {
          return; // Pedido atualizado com sucesso
        } else {
          return null; // Outro status
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  // Método para remover um pedido
  remover(id: number): Observable<void | null> {
    return this.http.delete<HttpResponse<void>>(`${this.API}/${id}`, this.httpOptions).pipe(
      map((resp) => {
        if (resp.status === 200) {
          return; // Pedido removido com sucesso
        } else {
          return null; // Outro status
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  // Método para obter receita total
  obterReceitaTotal(): Observable<number | null> {
    return this.listarTodos().pipe(
      map((pedidos) => {
        const receitaTotal = pedidos ? pedidos.reduce((total, pedido) => total + pedido.valorpedido, 0) : 0;
        return receitaTotal;
      }),
      catchError((err: HttpErrorResponse) => {
        return of(null); // Retorna null em caso de erro
      })
    );
  }

  // Método para obter clientes que mais gastaram
  obterClientesQueMaisGastaram(): Observable<
    {
      nome: string;
      totalGasto: number;
      quantidadePedidos: number;
      receitaTotal: number;
    }[] | null
  > {
    return this.listarTodos().pipe(
      map((pedidos) => {
        if (!pedidos) return null;

        const clientes: {
          [nome: string]: { totalGasto: number; quantidadePedidos: number };
        } = {};

        pedidos.forEach((pedido) => {
          const nomeCliente = pedido.nomecliente;
          if (clientes[nomeCliente]) {
            clientes[nomeCliente].totalGasto += pedido.valorpedido;
            clientes[nomeCliente].quantidadePedidos++;
          } else {
            clientes[nomeCliente] = {
              totalGasto: pedido.valorpedido,
              quantidadePedidos: 1,
            };
          }
        });

        return Object.keys(clientes).map((nome) => ({
          nome,
          totalGasto: clientes[nome].totalGasto,
          quantidadePedidos: clientes[nome].quantidadePedidos,
          receitaTotal: clientes[nome].totalGasto,
        })).sort((a, b) => b.totalGasto - a.totalGasto).slice(0, 3);
      }),
      catchError((err: HttpErrorResponse) => {
        return of(null); // Retorna null em caso de erro
      })
    );
  }
}
