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
<<<<<<< HEAD
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
=======
  // [x: string]: any;

  constructor(private loginService: LoginService) {}
>>>>>>> a03654306a1b13a92a6d0f4cbb78ee741997d435

  listarTodos(): Observable<Pedido[]> {
    const pessoaLogada = this.loginService.getPessoaLogada();
    let url = this.API;

    if (pessoaLogada instanceof PessoaFuncionario) {
<<<<<<< HEAD
      return this.http.get<Pedido[]>(url).pipe(catchError(this.handleError));
=======
      // Se a pessoa logada é um funcionário, retornar todos os pedidos
      return pedidos ? JSON.parse(pedidos) : [];
    }

    // Caso contrário, retornar apenas os pedidos do cliente logado
    return pedidos
      ? JSON.parse(pedidos).filter(
          (pedido: Pedido) => pedido.clienteId === pessoaLogada?.id
        )
      : [];
  }

  listarTodosPedidos(): Pedido[] {
    const pedidos = localStorage.getItem(LS_CHAVE_PEDIDO);
    return pedidos ? JSON.parse(pedidos) : [];
  }

  // Garantir salvamento no localstorage
  salvarPedidos(pedidos: Pedido[]): void {
    localStorage.setItem(LS_CHAVE_PEDIDO, JSON.stringify(pedidos));
  }

  salvar(pedido: Pedido): void {
    const pedidos = this.listarTodos();
    pedidos.push(pedido);
    this.salvarPedidos(pedidos);
  }

  inserir(
    pedido: Pedido,
    arrayPedidosRoupas: PecaRoupaQuantidade[],
    valorpedido: number
  ): void {
    //obtém uma lista completa de pedidos
    const pedidos = localStorage.getItem(LS_CHAVE_PEDIDO);
    const listaPedidos = pedidos ? JSON.parse(pedidos) : [];

    //seta um ID único, usamos Timestamp, quantidade de segundos desde 1970
    pedido.idpedido = new Date().getTime();

    //atribui o array recebido ao pedido
    pedido.arrayPedidosRoupas = arrayPedidosRoupas;

    const pessoaLogada = this.loginService.getPessoaLogada();
    if (pessoaLogada) {
      pedido.clienteId = pessoaLogada.id;
      pedido.nomecliente = pessoaLogada.nome;
>>>>>>> a03654306a1b13a92a6d0f4cbb78ee741997d435
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

<<<<<<< HEAD
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
=======
  buscaPorId(id: number): Pedido | undefined {
    //obtém a lista completa de pedido
    const pedidos = this.listarTodos();

    //efetua a busca
    //find() : retorna o primeiro elemento da lista que satisfaz a condição, caso contrário, undefined
    return pedidos.find((pedido) => pedido.idpedido === id);
  }

  atualizar(pedido: Pedido): void {
    //obtem a lista completa de pessoas
    const pedidos = this.listarTodosPedidos();

    //varre a lista de pessoas, quando encontra pessoa com mesmo id, altera a lista
    pedidos.forEach((obj, index, objs) => {
      if (pedido.idpedido === obj.idpedido) {
        objs[index] = pedido;
        this.salvarPedidos(pedidos);
      }
    });

    //Armazena a nova lista no LocalStorage
    // localStorage[LS_CHAVE_PEDIDO] = JSON.stringify(pedidos);
  }

  remover(id: number): void {
    //obtem lista completa de pedidos
    let pedidos = this.listarTodos();

    //filter() : retorna a mesma lista contendo todos os registros que satisfazem a condição
    pedidos = pedidos.filter((pedido) => pedido.idpedido !== id);

    //atualiza a lista de pessoas
    this.salvarPedidos(pedidos);
  }

  // Método para obter a receita total de todos os pedidos
  obterReceitaTotal(): number {
    let receitaTotal = 0;

    // Obtém todos os pedidos
    const todosOsPedidos = this.listarTodosPedidos();

    // Itera sobre cada pedido
    todosOsPedidos.forEach((todosOsPedidos) => {
      // Soma o valor do pedido à receita total
      receitaTotal += todosOsPedidos.valorpedido;
    });

    return receitaTotal;
  }

  // Método para obter os 3 clientes que mais gastaram
  obterClientesQueMaisGastaram(): {
    nome: string;
    totalGasto: number;
    quantidadePedidos: number;
    receitaTotal: number;
  }[] {
    // Objeto para armazenar os dados de cada cliente
    const clientes: {
      [nome: string]: { totalGasto: number; quantidadePedidos: number };
    } = {};
>>>>>>> a03654306a1b13a92a6d0f4cbb78ee741997d435

        const clientesArray = Object.keys(clientes).map(nome => ({
          nome,
          totalGasto: clientes[nome].totalGasto,
          quantidadePedidos: clientes[nome].quantidadePedidos,
          receitaTotal: clientes[nome].totalGasto
        }));

<<<<<<< HEAD
        return clientesArray.sort((a, b) => b.totalGasto - a.totalGasto).slice(0, 3);
      })
    );
=======
    // Itera sobre cada pedido para calcular o total gasto, quantidade de pedidos e receita total de cada cliente
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

    // Converte o objeto para um array de objetos com nome, totalGasto, quantidadePedidos e receitaTotal
    const clientesArray = Object.keys(clientes).map((nome) => ({
      nome,
      totalGasto: clientes[nome].totalGasto,
      quantidadePedidos: clientes[nome].quantidadePedidos,
      receitaTotal: clientes[nome].totalGasto, // Considerando receita total como o total gasto
    }));

    // Ordena o array com base no totalGasto em ordem decrescente
    clientesArray.sort((a, b) => b.totalGasto - a.totalGasto);

    // Retorna os dados dos 3 clientes que mais gastaram
    return clientesArray.slice(0, 3);
>>>>>>> a03654306a1b13a92a6d0f4cbb78ee741997d435
  }
}
