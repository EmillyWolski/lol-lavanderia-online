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

  codigoPedido!: number;
  pedido: Pedido | undefined;
  prazoMaximo: number | undefined;
  itensPedido: { nome: string, quantidade: number, preco: number }[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const pedidoId = Number(this.codigoPedido);
    if (!isNaN(pedidoId)) {
      this.pedido = this.pedidoService.buscaPorId(pedidoId);
      if (this.pedido) {
        this.calcularPrazoMaximo();
        this.carregarItensPedido();
      } else {
        alert('Pedido não encontrado. Por favor, verifique o código e tente novamente.');
      }
    } else {
      alert('Por favor, insira um código de pedido válido.');
    }
  }

  calcularPrazoMaximo(): void {
    if (this.pedido && this.pedido.arrayPedidosRoupas.length > 0) {
      this.prazoMaximo = this.pedido.arrayPedidosRoupas.reduce((maxPrazo, item) => {
        return Math.max(maxPrazo, item.pecaroupa.prazo);
      }, 0);
    } else {
      this.prazoMaximo = undefined;
    }
  }

  carregarItensPedido(): void {
    if (this.pedido && this.pedido.arrayPedidosRoupas) {
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