import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';

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
  listarTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Método para inserir um novo pedido
  inserir(pedido: Pedido, arrayPedidosRoupas: PecaRoupaQuantidade[], valorpedido: number): Observable<void> {
    // Atualiza as propriedades do pedido
    pedido.valorpedido = valorpedido;
    pedido.arrayPedidosRoupas = arrayPedidosRoupas; // Use a propriedade correta do modelo Pedido

    return this.http.post<void>(this.API, pedido, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Método para atualizar um pedido existente
  atualizar(pedido: Pedido): Observable<void> {
    return this.http.put<void>(`${this.API}/${pedido.idpedido}`, pedido, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Método para remover um pedido
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter receita total
  obterReceitaTotal(): Observable<number> {
    return this.listarTodos().pipe(
      map((pedidos) => {
        this.handleSuccess(200, 'Receita total calculada com sucesso.');
        return pedidos ? pedidos.reduce((total, pedido) => total + pedido.valorpedido, 0) : 0;
      }),
      catchError(this.handleError)
    );
  }

  // Método para obter clientes que mais gastaram
  obterClientesQueMaisGastaram(): Observable<
    {
      nome: string;
      totalGasto: number;
      quantidadePedidos: number;
      receitaTotal: number;
    }[]
  > {
    return this.listarTodos().pipe(
      map((pedidos) => {
        if (!pedidos) return [];

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

        const clientesArray = Object.keys(clientes).map((nome) => ({
          nome,
          totalGasto: clientes[nome].totalGasto,
          quantidadePedidos: clientes[nome].quantidadePedidos,
          receitaTotal: clientes[nome].totalGasto,
        }));

        this.handleSuccess(
          200,
          'Clientes que mais gastaram obtidos com sucesso.'
        );
        return clientesArray
          .sort((a, b) => b.totalGasto - a.totalGasto)
          .slice(0, 3);
      }),
      catchError(this.handleError)
    );
  }

  // Método para tratar erros de requisição
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Método para tratar sucesso 
  private handleSuccess(statusCode: number, message: string) {
    console.log(`Status: ${statusCode}, Mensagem: ${message}`);
  }
}
