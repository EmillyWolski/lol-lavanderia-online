import { Component } from '@angular/core';
import { PedidoService } from '../../services/pedido/pedido.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../shared/models/pedido.model';


@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './consultar-pedido.component.html',
  styleUrl: './consultar-pedido.component.css'
})

export class ConsultarPedidoComponent {

  codigoPedido!: number; // Alterado para número para corresponder ao tipo de ID
  pedidoEncontrado: any;
  pedido: Pedido | undefined;

  constructor(private PedidoService: PedidoService) { }

  // Método para buscar o pedido quando o usuário submeter o formulário
  ngOnInit(): void { }

  onSubmit(): void {
    const pedidoId = Number(this.codigoPedido);
    if (!isNaN(pedidoId)) {
      this.pedido = this.PedidoService.buscaPorId(pedidoId);
      if (!this.pedido) {
        alert('Pedido não encontrado. Por favor, verifique o código e tente novamente.');
      }
    } else {
      alert('Por favor, insira um código de pedido válido.');
    }
  }
}