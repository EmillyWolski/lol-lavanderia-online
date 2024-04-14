import { Component } from '@angular/core';
import { ConsultarPedidoService } from '../../services/consultar-pedido';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './consultar-pedido.component.html',
  styleUrl: './consultar-pedido.component.css'
})

export class ConsultarPedidoComponent {

  codigoPedido!: number; // Alterado para número para corresponder ao tipo de ID
  pedidoEncontrado: any;

  constructor(private consultarPedidoService: ConsultarPedidoService) { }

  // Método para buscar o pedido quando o usuário submeter o formulário
  onSubmit() {
    // Chamar o serviço para buscar o pedido com o ID fornecido
    this.pedidoEncontrado = this.consultarPedidoService.buscarPedidoPorId(this.codigoPedido);
    if (!this.pedidoEncontrado) {
      console.log('Pedido não encontrado');
      // Lógica para lidar com pedido não encontrado, se necessário
    }
  }
}

