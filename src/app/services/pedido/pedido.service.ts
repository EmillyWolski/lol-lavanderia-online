import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { LoginService } from '../login/login.service';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly API = 'http://localhost:8080/pedidos';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private loginService: LoginService) { }

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

  listarTodos(): Observable<Pedido[]> {
    const pessoaLogada = this.loginService.getPessoaLogada();
    let url = this.API;

    if (pessoaLogada instanceof PessoaFuncionario) {
      return this.http.get<Pedido[]>(url).pipe(catchError(this.handleError));
    } else {
      url += `?clienteId=${pessoaLogada?.id}`;
      return this.http.get<Pedido[]>(url).pipe(catchError(this.handleError));
    }
  }

  salvarPedidos(pedidos: Pedido[]): Observable<void> {
    return this.http.put<void>(this.API, pedidos, this.httpOptions).pipe(catchError(this.handleError));
  }

  salvar(pedido: Pedido): Observable<void> {
    return this.http.post<void>(this.API, pedido, this.httpOptions).pipe(catchError(this.handleError));
  }

  inserir(pedido: Pedido, arrayPedidosRoupas: PecaRoupaQuantidade[], valorpedido: number): Observable<void> {
    pedido.idpedido = new Date().getTime();
    pedido.arrayPedidosRoupas = arrayPedidosRoupas;
    const pessoaLogada = this.loginService.getPessoaLogada();
    pedido.clienteId = pessoaLogada?.id || 0; // Usando 0 como valor padrão
    pedido.nomecliente = pessoaLogada?.nome || 'Não identificado';
    pedido.valorpedido = valorpedido;
    pedido.statuspedido = pedido.statuspedido !== 'REJEITADO' ? 'EM ABERTO' : pedido.statuspedido;
    return this.salvar(pedido);
  }

  buscaPorId(id: number): Observable<Pedido | undefined> {
    return this.http.get<Pedido>(`${this.API}/${id}`).pipe(
      catchError(this.handleError),
      map(pedido => pedido)
    );
  }

  atualizar(pedido: Pedido): Observable<void> {
    return this.http.put<void>(`${this.API}/${pedido.idpedido}`, pedido, this.httpOptions).pipe(catchError(this.handleError));
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(catchError(this.handleError));
  }

  obterReceitaTotal(): Observable<number> {
    return this.listarTodos().pipe(
      map(pedidos => pedidos.reduce((total, pedido) => total + pedido.valorpedido, 0))
    );
  }

  obterClientesQueMaisGastaram(): Observable<{ nome: string; totalGasto: number; quantidadePedidos: number; receitaTotal: number }[]> {
    return this.listarTodos().pipe(
      map(pedidos => {
        const clientes: { [nome: string]: { totalGasto: number; quantidadePedidos: number } } = {};

        pedidos.forEach(pedido => {
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

        const clientesArray = Object.keys(clientes).map(nome => ({
          nome,
          totalGasto: clientes[nome].totalGasto,
          quantidadePedidos: clientes[nome].quantidadePedidos,
          receitaTotal: clientes[nome].totalGasto
        }));

        return clientesArray.sort((a, b) => b.totalGasto - a.totalGasto).slice(0, 3);
      })
    );
  }
}
