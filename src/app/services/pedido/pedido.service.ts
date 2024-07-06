import { Injectable } from '@angular/core';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { LoginService } from '../login/login.service';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

const LS_CHAVE_PEDIDO = 'pedido';

@Injectable({
  providedIn: 'root',
})

export class PedidoService {

  // [x: string]: any;

  constructor(private loginService: LoginService) { }

  listarTodos(): Pedido[] {
    const pedidos = localStorage.getItem(LS_CHAVE_PEDIDO);
    const pessoaLogada = this.loginService.getPessoaLogada();

    if (pessoaLogada instanceof PessoaFuncionario) {
      // Se a pessoa logada é um funcionário, retornar todos os pedidos
      return pedidos ? JSON.parse(pedidos) : [];
    }

    // Caso contrário, retornar apenas os pedidos do cliente logado
    return pedidos ? JSON.parse(pedidos).filter((pedido: Pedido) => pedido.clienteId === pessoaLogada?.id) : [];
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
    } else {
      pedido.nomecliente = 'Não identificado';
    }

    pedido.valorpedido = valorpedido;
    pedido.statuspedido = 'EM ABERTO';
    listaPedidos.push(pedido);
    this.salvarPedidos(listaPedidos);
  }

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
  obterClientesQueMaisGastaram(): { nome: string; totalGasto: number; quantidadePedidos: number; receitaTotal: number }[] {
    // Objeto para armazenar os dados de cada cliente
    const clientes: { [nome: string]: { totalGasto: number; quantidadePedidos: number } } = {};

    // Obtém todos os pedidos do localStorage
    const pedidos = this.listarTodosPedidos();

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
  }

}