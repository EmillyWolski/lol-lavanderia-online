import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { LoginService } from '../login/login.service';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

const LS_CHAVE_PEDIDO = 'pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/pedidos'; // URL da API REST

  constructor(private loginService: LoginService, private http: HttpClient) {}

  listarTodos(): Pedido[] {
    const pedidos = localStorage.getItem(LS_CHAVE_PEDIDO);
    const pessoaLogada = this.loginService.getPessoaLogada();

    if (pessoaLogada instanceof PessoaFuncionario) {
      return pedidos ? JSON.parse(pedidos) : [];
    }

    return pedidos ? JSON.parse(pedidos).filter((pedido: Pedido) => pedido.clienteId === pessoaLogada?.id) : [];
  }

  listarTodosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

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
    const pedidos = localStorage.getItem(LS_CHAVE_PEDIDO);
    const listaPedidos = pedidos ? JSON.parse(pedidos) : [];

    pedido.idpedido = new Date().getTime();
    pedido.arrayPedidosRoupas = arrayPedidosRoupas;

    const pessoaLogada = this.loginService.getPessoaLogada();
    if (pessoaLogada) {
      pedido.clienteId = pessoaLogada.id;
      pedido.nomecliente = pessoaLogada.nome;
    } else {
      pedido.nomecliente = 'Não identificado';
    }

    pedido.valorpedido = valorpedido;

    if (pedido.statuspedido !== 'REJEITADO') {
      pedido.statuspedido = 'EM ABERTO';
    }

    listaPedidos.push(pedido);
    this.salvarPedidos(listaPedidos);
  }

  buscaPorId(id: number): Pedido | undefined {
    const pedidos = this.listarTodos();
    return pedidos.find((pedido) => pedido.idpedido === id);
  }

  buscarPorIdNaApi(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  atualizar(pedido: Pedido): void {
    const pedidos = this.listarTodos(); // Obtém pedidos do local storage

    // Atualiza o pedido encontrado
    pedidos.forEach((obj, index) => {
      if (pedido.idpedido === obj.idpedido) {
        pedidos[index] = pedido;
      }
    });

    // Salva a lista atualizada no local storage
    this.salvarPedidos(pedidos);
  }

  remover(id: number): void {
    let pedidos = this.listarTodos();
    pedidos = pedidos.filter((pedido) => pedido.idpedido !== id);
    this.salvarPedidos(pedidos);
  }

  obterReceitaTotal(): number {
    let receitaTotal = 0;

    // Obtém todos os pedidos do local storage
    const todosOsPedidos = this.listarTodos();

    // Itera sobre cada pedido
    todosOsPedidos.forEach((pedido) => {
      receitaTotal += pedido.valorpedido || 0; // Protege contra undefined
    });

    return receitaTotal;
  }

  obterClientesQueMaisGastaram(): Observable<{ nome: string; totalGasto: number; quantidadePedidos: number; receitaTotal: number }[]> {
    return this.http.get<{ nome: string; totalGasto: number; quantidadePedidos: number; receitaTotal: number }[]>(`${this.apiUrl}/clientes-que-mais-gastaram`);
  }

  inserirNaApi(pedido: Pedido): Observable<Pedido> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Pedido>(this.apiUrl, pedido, { headers });
  }
}
