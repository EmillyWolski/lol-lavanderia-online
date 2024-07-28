import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';

@Component({
  selector: 'app-fazer-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './fazer-pedido.component.html',
  styleUrls: ['./fazer-pedido.component.css'],
})
export class FazerPedidoComponent implements OnInit {
  pedidos: Pedido[] = []; // Array para armazenar a lista de pedidos
  mensagem: string | null = null; // Mensagem de erro ou sucesso
  mensagem_detalhes: string | null = null; // Detalhes da mensagem de erro

  constructor(private pedidoService: PedidoService) {}

  // Método de inicialização do componente
  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos ?? []; // Garante que pedidos será um array
      },
      error: (err) => {
        this.mensagem = 'Erro ao listar pedidos.';
        this.mensagem_detalhes = '[${err.status}] ${err.message}';
        console.error('Erro ao listar pedidos:', err);
      },
    });
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault(); // Previne o comportamento padrão do evento
    if (confirm('Deseja realmente cancelar o pedido ${pedido.idpedido}?')) {
      pedido.statuspedido = 'CANCELADO';
      pedido.pagamentoRealizado = true;
      pedido.cancelamentoRealizado = true;

      this.pedidoService.atualizar(pedido).subscribe({
        next: () => {
          alert('O pedido ${pedido.idpedido} foi cancelado.');
          this.pedidos = this.pedidos.filter(p => p.idpedido !== pedido.idpedido);
        },
        error: (err) => {
          this.mensagem = 'Erro ao cancelar o pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao cancelar pedido:', err);
        },
      });
    }
  }
}