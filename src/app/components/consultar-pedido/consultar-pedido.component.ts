import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {

  codigoPedido!: number; // Código do pedido inserido pelo usuário
  pedido: Pedido | undefined; // Objeto que irá armazenar os detalhes do pedido
  prazoMaximo: number | undefined;
  itensPedido: { nome: string, quantidade: number, preco: number }[] = []; // Lista de itens do pedido

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    // Converte o código do pedido para número e verifica se é válido
    const pedidoId = Number(this.codigoPedido);
    if (!isNaN(pedidoId)) {
      // Consulta a API de pedidos pelo ID
      this.pedidoService.buscaPorId(pedidoId).subscribe({
        next: (pedido) => {
          this.pedido = pedido;
          if (this.pedido) {
            this.calcularPrazoMaximo();
            this.carregarItensPedido();
          } else {
            alert('Pedido não encontrado. Por favor, verifique o código e tente novamente.');
          }
        },
        error: () => {
          alert('Erro ao buscar o pedido. Por favor, tente novamente.');
        }
      });
    } else {
      alert('Por favor, insira um código de pedido válido.');
    }
  }

  calcularPrazoMaximo(): void {
    // Verifica se o pedido e a lista de itens do pedido existem
    if (this.pedido && this.pedido.arrayPedidosRoupas.length > 0) {
      // Calcula o prazo máximo baseado no prazo de cada item do pedido
      this.prazoMaximo = this.pedido.arrayPedidosRoupas.reduce((maxPrazo, item) => {
        return Math.max(maxPrazo, item.pecaroupa.prazo);
      }, 0);
    } else {
      this.prazoMaximo = undefined;
    }
  }

  carregarItensPedido(): void {
    // Verifica se o pedido e a lista de itens do pedido existem
    if (this.pedido && this.pedido.arrayPedidosRoupas) {
      // Mapeia os itens do pedido para um formato mais legível
      this.itensPedido = this.pedido.arrayPedidosRoupas.map(item => {
        return {
          nome: item.pecaroupa.nome,
          quantidade: item.quantidade,
          preco: item.pecaroupa.valor
        };
      });
    } else {
      this.itensPedido = [];
    }
  }
}
