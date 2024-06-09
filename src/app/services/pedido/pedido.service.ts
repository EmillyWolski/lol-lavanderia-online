import { Injectable } from '@angular/core';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { LoginService } from '../login/login.service';

const LS_CHAVE_PEDIDO = 'pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  [x: string]: any;
  constructor(private loginService: LoginService) { }

  listarTodos(): Pedido[] {
    const pedido = localStorage[LS_CHAVE_PEDIDO];
    //precisa do condicional, pois retorna undefined se a chave não existe
    return pedido ? JSON.parse(pedido) : [];
  }

  inserir(
    pedido: Pedido,
    arrayPedidosRoupas: PecaRoupaQuantidade[],
    valorpedido: number
  ): void {
    //obtém uma lista completa de pedidos
    const pedidos = this.listarTodos();

    //seta um ID único, usamos Timestamp, quantidade de segundos desde 1970
    pedido.idpedido = new Date().getTime();

    //atribui o array recebido ao pedido
    pedido.arrayPedidosRoupas = arrayPedidosRoupas;

    const pessoaLogada = this.loginService.getPessoaLogada();
    pedido.nomecliente = pessoaLogada ? pessoaLogada.nome : 'Não identificado';

    //atribui o valor total do pedido recebido via parametro
    pedido.valorpedido = valorpedido;

    //Atribui o status inicial do pedido
    pedido.statuspedido = 'EM ABERTO';

    //Adiciona no final da lista
    pedidos.push(pedido);

    //armazena no LocalStrorage
    localStorage[LS_CHAVE_PEDIDO] = JSON.stringify(pedidos);
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
    const pedidos = this.listarTodos();

    //varre a lista de pessoas, quando encontra pessoa com mesmo id, altera a lista
    pedidos.forEach((obj, index, objs) => {
      if (pedido.idpedido === obj.idpedido) {
        objs[index] = pedido;
      }
    });

    //Armazena a nova lista no LocalStorage
    localStorage[LS_CHAVE_PEDIDO] = JSON.stringify(pedidos);
  }

  remover(id: number): void {

    //obtem lista completa de pedidos
    let pedidos = this.listarTodos();

    //filter() : retorna a mesma lista contendo todos os registros que satisfazem a condição
    pedidos = pedidos.filter((pedido) => pedido.idpedido !== id);

    //atualiza a lista de pessoas
    localStorage[LS_CHAVE_PEDIDO] = JSON.stringify(pedidos);
  }

  // Método para obter a receita total de todos os pedidos
  obterReceitaTotal(): number {
    let receitaTotal = 0;

    // Obtém todos os pedidos
    const pedidos = this.listarTodos();

    // Itera sobre cada pedido
    pedidos.forEach((pedido) => {
      // Soma o valor do pedido à receita total
      receitaTotal += pedido.valorpedido;
    });

    return receitaTotal;
  }

  // Método para obter os 3 clientes que mais gastaram
  obterClientesQueMaisGastaram(): { nome: string; totalGasto: number }[] {
    const clientes: { [nome: string]: { totalGasto: number; quantidadePedidos: number } } = {}; // Definindo o tipo explícito

    // Obtém todos os pedidos
    const pedidos = this.listarTodos();

    // Itera sobre cada pedido
    pedidos.forEach((pedido) => {
      // Se o cliente já existe no objeto clientes, soma o valor do pedido e incrementa a quantidade de pedidos, senão, cria uma nova entrada
      if (clientes[pedido.nomecliente]) {
        clientes[pedido.nomecliente].totalGasto += pedido.valorpedido;
        clientes[pedido.nomecliente].quantidadePedidos += 1;
      } else {
        clientes[pedido.nomecliente] = {
          totalGasto: pedido.valorpedido,
          quantidadePedidos: 1
        };
      }
    });

    // Converte o objeto para uma matriz de pares [chave, valor]
    const clientesArray = Object.entries(clientes);

    // Ordena a matriz com base no valor (total gasto)
    clientesArray.sort((a, b) => b[1].totalGasto - a[1].totalGasto);

    // Retorna os 3 clientes que mais gastaram
    return clientesArray.slice(0, 3).map((cliente) => ({
      nome: cliente[0],
      totalGasto: cliente[1].totalGasto,
      quantidadePedidos: cliente[1].quantidadePedidos
    }));
  }

}
