import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicial-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './inicial-cliente.component.html',
  styleUrls: ['./inicial-cliente.component.css']
})
export class InicialClienteComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  filtroStatus: string = 'em_aberto'; // Inicia com 'em_aberto'

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedidos(); // Inicia o carregamento de pedidos
  }

  carregarPedidos(): void {
    this.pedidos = this.listarTodos(); // Carrega todos os pedidos
    this.filtrarPedidos(); // Filtra de acordo com o filtro atual
  }

  listarTodos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente cancelar o pedido ${pedido.idpedido}?`)) {
      pedido.statuspedido = 'CANCELADO';
      pedido.cancelamentoRealizado = true;
      pedido.pagamentoRealizado = true;
      this.pedidoService.atualizar(pedido);
      this.carregarPedidos(); // Atualiza a lista de pedidos após remover
      alert(`O pedido ${pedido.idpedido} foi cancelado.`);
    }
  }

  pagar($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (pedido.statuspedido === 'AGUARDANDO PAGAMENTO' && confirm(`Deseja realmente pagar o pedido ${pedido.idpedido}?`)) {
      pedido.statuspedido = 'PAGO';
      pedido.pagamentoRealizado = true;
      this.pedidoService.atualizar(pedido);
      this.carregarPedidos(); // Atualiza a lista de pedidos após pagamento
      alert(`Pagamento realizado para o pedido ${pedido.idpedido}.`);
    } else {
      alert(`O pedido ${pedido.idpedido} ainda não foi lavado, aguarde para efetuar o pagamento!`);
    }
  }

  // Método para filtrar os pedidos de acordo com o filtroStatus atual
  filtrarPedidos(): void {
    if (this.filtroStatus === 'todos') {
      this.pedidosFiltrados = this.pedidos; // Mostra todos os pedidos
    } else {
      this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.statuspedido === this.mapStatus(this.filtroStatus));
    }
  }

  // Método para mapear os valores do filtro para os status dos pedidos
  mapStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'em_aberto': 'EM ABERTO',
      'cancelado': 'CANCELADO',
      'recolhido': 'RECOLHIDO',
      'aguardando_pagamento': 'AGUARDANDO PAGAMENTO',
      'pago': 'PAGO',
      'finalizado': 'FINALIZADO'
    };
    return statusMap[status] || status;
  }

  // Método para retornar a classe CSS correspondente ao status do pedido
  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      'EM ABERTO': 'status-em-aberto',
      'CANCELADO': 'status-cancelado',
      'RECOLHIDO': 'status-recolhido',
      'AGUARDANDO PAGAMENTO': 'status-aguardando-pagamento',
      'PAGO': 'status-pago',
      'FINALIZADO': 'status-finalizado'
    };
    return statusClassMap[status] || '';
  }
}
