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

  constructor(private pedidoService: PedidoService) {}

  // Método de inicialização do componente
  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    // Usar a função listarTodos do serviço que retorna um Observable
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        // Atualiza a propriedade pedidos com os dados recebidos do serviço
        this.pedidos = pedidos;
      },
      error: (err) => {
        console.error('Erro ao listar pedidos:', err);
      },
    });
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault(); // Previne o comportamento padrão do evento
    if (confirm(`Deseja realmente cancelar o pedido ${pedido.idpedido}?`)) {

      pedido.statuspedido = 'CANCELADO';
      pedido.pagamentoRealizado = true;
      pedido.cancelamentoRealizado = true;

      // Atualiza o pedido no serviço
      this.pedidoService.atualizar(pedido).subscribe({
        next: () => {
          alert(`O pedido ${pedido.idpedido} foi cancelado.`);
          // Remove o pedido cancelado da lista de pedidos local, sem precisar fazer uma nova chamada para a API
          this.pedidos = this.pedidos.filter(p => p.idpedido !== pedido.idpedido);
        },
        error: (err) => {
          console.error('Erro ao cancelar pedido:', err);
        },
      });
    }
  }
}