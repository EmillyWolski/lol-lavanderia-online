import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../shared/models/pedido.model';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-inicial-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './inicial-funcionario.component.html',
  styleUrl: './inicial-funcionario.component.css'
})

export class InicialFuncionarioComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = []; // Armazena os pedidos filtrados com base no status selecionado.
  filtroStatus: string = 'em_aberto'; // Inicia com 'em_aberto'

  constructor(private pedidoService: PedidoService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.pedidos = this.listarTodosPedidos();
    this.filtrarPedidos();
  }

  carregarPedidos(): void {
    this.pedidos = this.listarTodosPedidos(); // Carrega todos os pedidos
    this.filtrarPedidos(); // Filtra de acordo com o filtro atual
  }

  listarTodosPedidos(): Pedido[] {
    return this.pedidoService.listarTodosPedidos();
  }

  recolherPedido($event: any, pedido: Pedido): void {

    $event.preventDefault();

    if (confirm(`Deseja realmente recolher o pedido ${pedido.idpedido}?`)) {

      // Alterar o status do pedido para "RECOLHIDO"
      pedido.statuspedido = 'RECOLHIDO';

      // Atualizar o pedido no serviço
      this.pedidoService.atualizar(pedido);

      // Notificar o recolhimento
      alert(`O pedido ${pedido.idpedido} foi recolhido.`);
      console.log(`O pedido ${pedido.idpedido} foi recolhido.`);

      //this.pedidos = this.listarTodosPedidos();
      //this.filtrarPedidos();

      // Atualizar a lista de pedidos
      this.atualizarPedidos();
    }
  }

  lavarPedido($event: any, pedido: Pedido): void {
    $event.preventDefault();

    // Alterar o status do pedido para "RECOLHIDO"
    pedido.statuspedido = 'AGUARDANDO PAGAMENTO';

    // Atualizar o pedido no serviço
    this.pedidoService.atualizar(pedido);

    if (confirm(`Deseja realmente lavar o pedido ${pedido.idpedido}?`)) {
      // Implemente a lógica para lavar o pedido aqui

      // Notificar que o pedido foi lavado
      alert(`O pedido ${pedido.idpedido} foi lavado.`);
      console.log(`O pedido ${pedido.idpedido} foi lavado.`);

      // Atualizar a lista de pedidos
      this.atualizarPedidos();
    }
  }

  finalizarPedido($event: any, pedido: Pedido): void {
    $event.preventDefault();

    if (confirm(`Deseja realmente finalizar o pedido ${pedido.idpedido}?`)) {
      // Alterar o status do pedido para "FINALIZADO"
      pedido.statuspedido = 'FINALIZADO';

      // Atualizar o pedido no serviço
      this.pedidoService.atualizar(pedido);

      // Notificar que o pedido foi finalizado
      alert(`O pedido ${pedido.idpedido} foi finalizado.`);
      console.log(`O pedido ${pedido.idpedido} foi finalizado.`);

      // Atualizar a lista de pedidos
      this.pedidos = this.listarTodosPedidos();
      //this.filtrarPedidos();
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
      'REJEITADO': 'status-rejeitado',
      'RECOLHIDO': 'status-recolhido',
      'AGUARDANDO PAGAMENTO': 'status-aguardando-pagamento',
      'PAGO': 'status-pago',
      'FINALIZADO': 'status-finalizado'
    };
    return statusClassMap[status] || '';
  }

  // Método para atualizar a lista de pedidos após uma ação ser realizada.
  private atualizarPedidos(): void {
    this.pedidos = this.listarTodosPedidos();
    //this.filtrarPedidos();
  }

  confirmarLogout(event: Event): void {
    event.preventDefault();
    
    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['inicio/login']); // Redireciona para a tela de login após o logout
    }
  }
}