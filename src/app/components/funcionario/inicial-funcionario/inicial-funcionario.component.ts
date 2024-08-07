import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../shared/models/pedido.model';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-inicial-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './inicial-funcionario.component.html',
  styleUrls: ['./inicial-funcionario.component.css'],
})

export class InicialFuncionarioComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = []; // Armazena os pedidos filtrados com base no status selecionado.
  filtroStatus: string = 'em_aberto'; // Inicia com 'em_aberto'
  mensagem: string | null = null; // Mensagem de erro ou sucesso
  mensagem_detalhes: string | null = null; // Detalhes da mensagem de erro
  funcionarios: Usuario[] = []; // Lista de funcionários

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.carregarPedidos(); // Inicia o carregamento dos pedidos
  }

  carregarPedidos(): void {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos ?? []; // Garante que pedidos será um array
        this.filtrarPedidos(); // Filtra de acordo com o filtro atual
      },
      error: (err) => {
        this.mensagem = 'Erro ao carregar pedidos.';
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        console.error('Erro ao carregar pedidos:', err);
      },
    });
  }

  recolherPedido($event: any, pedido: Pedido): void {
    $event.preventDefault();

    if (confirm(`Deseja realmente recolher o pedido ${pedido.idPedido}?`)) {
      pedido.statusPedido = 'RECOLHIDO';

      this.pedidoService.alterar(pedido).subscribe({
        next: () => {
          alert(`O pedido ${pedido.idPedido} foi recolhido.`);
          this.carregarPedidos(); // Atualiza a lista de pedidos
        },
        error: (err) => {
          this.mensagem = 'Erro ao atualizar pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao atualizar pedido:', err);
        },
      });
    }
  }

  lavarPedido($event: any, pedido: Pedido): void {
    $event.preventDefault();

    if (confirm(`Deseja realmente lavar o pedido ${pedido.idPedido}?`)) {
      pedido.statusPedido = 'AGUARDANDO PAGAMENTO';

      this.pedidoService.alterar(pedido).subscribe({
        next: () => {
          alert(`O pedido ${pedido.idPedido} foi lavado.`);
          this.carregarPedidos(); // Atualiza a lista de pedidos
        },
        error: (err) => {
          this.mensagem = 'Erro ao atualizar pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao atualizar pedido:', err);
        },
      });
    }
  }

  finalizarPedido($event: any, pedido: Pedido): void {
    $event.preventDefault();

    if (confirm(`Deseja realmente finalizar o pedido ${pedido.idPedido}?`)) {
      pedido.statusPedido = 'FINALIZADO';

      this.pedidoService.alterar(pedido).subscribe({
        next: () => {
          alert(`O pedido ${pedido.idPedido} foi finalizado.`);
          this.carregarPedidos(); // Atualiza a lista de pedidos
        },
        error: (err) => {
          this.mensagem = 'Erro ao atualizar pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao atualizar pedido:', err);
        },
      });
    }
  }

  filtrarPedidos(): void {
    if (this.filtroStatus === 'todos') {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(
        (pedido) => pedido.statusPedido === this.mapStatus(this.filtroStatus)
      );
    }
  }

  mapStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      em_aberto: 'EM ABERTO',
      cancelado: 'CANCELADO',
      rejeitado: 'REJEITADO',
      recolhido: 'RECOLHIDO',
      aguardando_pagamento: 'AGUARDANDO PAGAMENTO',
      pago: 'PAGO',
      finalizado: 'FINALIZADO',
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      'EM ABERTO': 'status-em-aberto',
      CANCELADO: 'status-cancelado',
      REJEITADO: 'status-rejeitado',
      RECOLHIDO: 'status-recolhido',
      'AGUARDANDO PAGAMENTO': 'status-aguardando-pagamento',
      PAGO: 'status-pago',
      FINALIZADO: 'status-finalizado',
    };
    return statusClassMap[status] || '';
  }

  confirmarLogout(event: Event): void {
    event.preventDefault();

    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }

}
