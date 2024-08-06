import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicial-cliente',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './inicial-cliente.component.html',
  styleUrls: ['./inicial-cliente.component.css'],
})
export class InicialClienteComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  filtroStatus: string = 'em_aberto'; // Inicializa com 'em_aberto'
  mensagem: string | null = null; // Mensagem de erro ou sucesso
  mensagem_detalhes: string | null = null; // Detalhes da mensagem de erro

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.carregarPedidos(); // Inicia o carregamento de pedidos
  }

  // Carrega todos os pedidos e filtra de acordo com o filtro atual
  carregarPedidos(): void {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos ?? []; // Garante que pedidos será um array
        this.filtrarPedidos(); // Filtra os pedidos após o carregamento
      },
      error: (err: HttpErrorResponse) => {
        this.mensagem = 'Erro ao carregar pedidos.';
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        console.error('Erro ao carregar pedidos:', err.message);
      },
    });
  }

  // Remove o pedido e atualiza a lista
  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (confirm('Deseja realmente cancelar o pedido ${pedido.idpedido}?')) {
      pedido.statusPedido = 'CANCELADO';
      pedido.cancelamentoRealizado = true;
      pedido.pagamentoRealizado = true;

      this.pedidoService.alterar(pedido).subscribe({
        next: () => {
          this.carregarPedidos(); // Atualiza a lista de pedidos após remoção
          alert('O pedido ${pedido.idpedido} foi cancelado.');
        },
        error: (err: HttpErrorResponse) => {
          this.mensagem = 'Erro ao atualizar pedido.';
          this.mensagem_detalhes = '[${err.status}] ${err.message}';
          console.error('Erro ao atualizar pedido:', err.message);
        },
      });
    }
  }

  // Realiza o pagamento do pedido e atualiza a lista
  pagar($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (
      pedido.statusPedido === 'AGUARDANDO PAGAMENTO' &&
      confirm('Deseja realmente pagar o pedido ${pedido.idpedido}?')
    ) {
      pedido.statusPedido = 'PAGO';
      pedido.pagamentoRealizado = true;

      this.pedidoService.alterar(pedido).subscribe({
        next: () => {
          this.carregarPedidos(); // Atualiza a lista de pedidos após pagamento
          alert('Pagamento realizado para o pedido ${pedido.idpedido}.');
        },
        error: (err: HttpErrorResponse) => {
          this.mensagem = 'Erro ao atualizar pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao atualizar pedido:', err.message);
        },
      });
    } else {
      alert(
        'O pedido ${pedido.idpedido} ainda não foi lavado, aguarde para efetuar o pagamento!'
      );
    }
  }

  // Filtra os pedidos de acordo com o filtroStatus atual
  filtrarPedidos(): void {
    if (this.filtroStatus === 'todos') {
      this.pedidosFiltrados = this.pedidos; // Mostra todos os pedidos
    } else {
      this.pedidosFiltrados = this.pedidos.filter(
        (pedido) => pedido.statusPedido === this.mapStatus(this.filtroStatus)
      );
    }
  }

  // Mapeia os valores do filtro para os status dos pedidos
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

  // Retorna a classe CSS correspondente ao status do pedido
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

  // Confirma o logout do usuário
  confirmarLogout(event: Event): void {
    event.preventDefault();

    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }
}
