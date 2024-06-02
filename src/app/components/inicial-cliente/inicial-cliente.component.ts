import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { FormsModule } from '@angular/forms'; // Adicionando o FormsModule


@Component({
  selector: 'app-inicial-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './inicial-cliente.component.html',
  styleUrl: './inicial-cliente.component.css'
})

export class InicialClienteComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = []; // Armazena os pedidos filtrados com base no status selecionado.
  filtroStatus: string = 'todos';

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidos = this.listarTodos();
    this.filtrarPedidos();
  }

  listarTodos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente cancelar o pedido ${pedido.idpedido}`)) {
      pedido.statuspedido = 'CANCELADO';
      pedido.cancelamentoRealizado = true; // Define a propriedade como true após o cancelamento
      pedido.pagamentoRealizado = true; // Define a propriedade como true após o cancelamento

      this.pedidoService.atualizar(pedido);
      this.atualizarPedidos();
      this.pedidos = this.listarTodos();

      // this.pedidoService.remover(pedido.idpedido!);
      alert(`O pedido ${pedido.idpedido} foi cancelado.`);
    }
  }

  pagar($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (pedido.statuspedido === 'AGUARDANDO PAGAMENTO' && confirm(`Deseja realmente pagar o pedido ${pedido.idpedido}?`)) {
      pedido.statuspedido = 'PAGO';
      pedido.pagamentoRealizado = true; // Define a propriedade como true após o pagamento
      this.pedidoService.atualizar(pedido);
      this.atualizarPedidos();
      // Notificar o pagamento
      alert(`Pagamento realizado para o pedido ${pedido.idpedido}.`);
    } else {
      alert(`O pagamento não pode ser realizado para o pedido ${pedido.idpedido} no momento.`);
    }
  }
  
  // Método para atualizar a lista de pedidos com base no filtro selecionado.
  filtrarPedidos(): void {
    if (this.filtroStatus === 'todos') {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.statuspedido === this.mapStatus(this.filtroStatus));
    }
  }

  // Atualiza a lista de pedidos
  atualizarPedidos(): void {
    this.pedidos = this.listarTodos();
    this.filtrarPedidos();
  }

  // Método para mapear os valores do filtro para os status dos pedidos.
  mapStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'em_aberto': 'EM ABERTO',
      'cancelado': 'CANCELADO',
      'rejeitado': 'REJEITADO',
      'recolhido': 'RECOLHIDO',
      'aguardando_pagamento': 'AGUARDANDO PAGAMENTO',
      'pago': 'PAGO',
      'finalizado': 'FINALIZADO'
    };
    return statusMap[status] || status;
  }

  // Método para retornar a classe CSS correspondente ao status do pedido.
  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      'EM ABERTO': 'status-em-aberto',
      'CANCELADO': 'status-cancelado',
      'REJEITADO': 'status-cancelado',
      'RECOLHIDO': 'status-recolhido',
      'AGUARDANDO PAGAMENTO': 'status-aguardando-pagamento',
      'PAGO': 'status-pago',
      'FINALIZADO': 'status-finalizado'
    };
    return statusClassMap[status] || '';
  }

}



