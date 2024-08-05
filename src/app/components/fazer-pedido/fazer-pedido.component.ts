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
  styleUrl: './fazer-pedido.component.css',
})

export class FazerPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidos = this.listarTodos();
  }
  
  listarTodos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente cancelar o pedido ${pedido.idpedido}?`)) {
      // Alterar o status do pedido para "CANCELADO"
      pedido.statuspedido = 'CANCELADO';
      pedido.pagamentoRealizado = true;
      pedido.cancelamentoRealizado = true; // Define a propriedade como true após o cancelamento
  
      // Atualizar o pedido na API
      this.pedidoService.atualizar(pedido);
      
      // Remover o pedido do local storage
      this.pedidoService.remover(pedido.idpedido!);
      alert(`O pedido ${pedido.idpedido} foi cancelado.`);
  
      // Atualizar a lista de pedidos
      this.pedidos = this.listarTodos();
    }
  }
}