import { Injectable } from '@angular/core';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';

const LS_CHAVE_PEDIDO = 'pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor() {}

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

    //atribui um nome de teste para o usuário
    pedido.nomecliente = 'Teste';

    //atribui o valor total do pedido recebido via parametro
    pedido.valorpedido = valorpedido;

    //Atribui o status inicial do pedido
    pedido.statuspedido = 'PEDIDO EM ABERTO';

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
}
