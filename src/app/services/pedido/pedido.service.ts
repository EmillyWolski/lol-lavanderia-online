import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { LoginService } from '../login/login.service';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly BASE_URL = 'http://localhost:8080/pedidos';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  private handleSuccess(status: number, message: string) {
    console.log(`Status: ${status} - ${message}`);
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(`Status: ${error.status} - ${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }

  listarTodos(): Observable<Pedido[] | null> {
    return this.httpClient.get<Pedido[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resp: HttpResponse<Pedido[]>) => {
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

  buscarPorId(id: number): Observable<Pedido | null> {
    return this.httpClient
      .get<Pedido>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Pedido>) => {
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

  inserir(pedido: Pedido): Observable<Pedido | null> {
    return this.httpClient
      .post<Pedido>(this.BASE_URL, JSON.stringify(pedido), this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Pedido>) => {
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

  remover(id: number): Observable<Pedido | null> {
    return this.httpClient
      .delete<Pedido>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Pedido>) => {
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

  alterar(pedido: Pedido): Observable<Pedido | null> {
    return this.httpClient
      .put<Pedido>(
        this.BASE_URL + '/' + pedido.idPedido,
        JSON.stringify(pedido),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Pedido>) => {
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

  obterReceitaTotal(): Observable<number> {
    return this.listarTodos().pipe(
      map((pedidos) => {
        this.handleSuccess(200, 'Receita total calculada com sucesso.');
        return pedidos
          ? pedidos.reduce((total, pedido) => total + pedido.valorPedido, 0)
          : 0;
      }),
      catchError(this.handleError)
    );
  }
}

/*


  private handleSuccess(status: number, message: string) {
    console.log(`Status: ${status} - ${message}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(`Status: ${error.status} - ${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }

  listarTodos(): Observable<Pedido[] | null> {
    const pessoaLogada = this.loginService.usuarioLogado;
    let url = this.BASE_URL;

    if (pessoaLogada instanceof PessoaFuncionario) {
      return this.httpClient.get<Pedido[]>(url, this.httpOptions).pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedidos listados com sucesso.');
          return response.body || [];
        }),
        catchError((err) => {
          if (err.status === 404) {
            this.handleSuccess(404, 'Nenhum pedido encontrado.');
            return of([]);
          } else {
            return this.handleError(err);
          }
        })
      );
    } else {
      url += `?clienteId=${pessoaLogada?.id}`;
      return this.httpClient.get<Pedido[]>(url, this.httpOptions).pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedidos listados com sucesso.');
          return response.body || [];
        }),
        catchError((err) => {
          if (err.status === 404) {
            this.handleSuccess(404, 'Nenhum pedido encontrado.');
            return of([]);
          } else {
            return this.handleError(err);
          }
        })
      );
    }
  }

  salvarPedidos(pedidos: Pedido[]): Observable<void> {
    return this.httpClient
      .put<void>(this.BASE_URL, pedidos, this.httpOptions)
      .pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedidos salvos com sucesso.');
        }),
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  salvar(pedido: Pedido): Observable<void> {
    return this.httpClient
      .post<void>(this.BASE_URL, JSON.stringify(pedido), this.httpOptions)
      .pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedido salvo com sucesso.');
        }),
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  inserir(
    pedido: Pedido,
    arrayPedidosRoupas: PecaRoupaQuantidade[],
    valorpedido: number
  ): Observable<void> {
    pedido.idPedido = new Date().getTime();
    pedido.pecaRoupaQnt = arrayPedidosRoupas;
    const pessoaLogada = this.loginService.usuarioLogado;
    pedido.usuario = pessoaLogada;
    pedido.valorPedido = valorpedido;
    pedido.statusPedido =
      pedido.statusPedido !== 'REJEITADO' ? 'EM ABERTO' : pedido.statusPedido;
    return this.salvar(pedido);
  }

  buscaPorId(id: number): Observable<Pedido | undefined> {
    return this.httpClient
      .get<Pedido>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedido encontrado com sucesso.');
          return response.body || undefined; // Retorna undefined se o corpo for null
        }),
        catchError((err) => {
          if (err.status === 404) {
            this.handleSuccess(404, 'Pedido não encontrado.');
            return of(undefined); // Retorna undefined se não encontrado
          } else {
            return this.handleError(err);
          }
        })
      );
  }

  atualizar(pedido: Pedido): Observable<void> {
    return this.httpClient
      .put<void>(
        `${this.BASE_URL}/${pedido.idPedido}`,
        pedido,
        this.httpOptions
      )
      .pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedido atualizado com sucesso.');
        }),
        catchError((err) => {
          if (err.status === 404) {
            this.handleSuccess(404, 'Pedido não encontrado.');
          }
          return this.handleError(err);
        })
      );
  }

  remover(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        map((response) => {
          this.handleSuccess(response.status, 'Pedido removido com sucesso.');
        }),
        catchError((err) => {
          if (err.status === 404) {
            this.handleSuccess(404, 'Pedido não encontrado.');
          }
          return this.handleError(err);
        })
      );
  }

  obterReceitaTotal(): Observable<number> {
    return this.listarTodos().pipe(
      map((pedidos) => {
        this.handleSuccess(200, 'Receita total calculada com sucesso.');
        return pedidos
          ? pedidos.reduce((total, pedido) => total + pedido.valorPedido, 0)
          : 0;
      }),
      catchError(this.handleError)
    );
  }

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
          const nomeCliente = pedido.usuario.nome;
          if (clientes[nomeCliente]) {
            clientes[nomeCliente].totalGasto += pedido.valorPedido;
            clientes[nomeCliente].quantidadePedidos++;
          } else {
            clientes[nomeCliente] = {
              totalGasto: pedido.valorPedido,
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
  */
