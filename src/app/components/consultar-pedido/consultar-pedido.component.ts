import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../shared/models/pedido.model';
import { ConsultarPedidoService } from '../../services/consultar-pedido/consultar-pedido.service';

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {

  codigoPedido!: number; // Código do pedido inserido pelo usuário
  pedido: Pedido | null = null; // Objeto que irá armazenar os detalhes do pedido
  prazoMaximo: number | undefined;
  itensPedido: { nome: string, quantidade: number, preco: number }[] = []; // Lista de itens do pedido
  mensagem: string | null = null; // Mensagem de erro a ser exibida
  mensagem_detalhes: string | null = null; // Detalhes da mensagem de erro

  constructor(private consultarPedidoService: ConsultarPedidoService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.mensagem = null;
    this.mensagem_detalhes = null;

    // Converte o código do pedido para número e verifica se é válido
    const pedidoId = Number(this.codigoPedido);
    if (!isNaN(pedidoId)) {
      // Consulta a API de pedidos pelo ID
      this.consultarPedidoService.buscarPedidoPorId(pedidoId).subscribe({
        next: (pedido) => {
          if (pedido === null) {
            this.pedido = null;
            this.mensagem = 'Pedido não encontrado. Por favor, verifique o código e tente novamente.';
          } else {
            this.pedido = pedido;
            this.calcularPrazoMaximo();
            this.carregarItensPedido();
          }
        },
        error: (err) => {
          this.pedido = null;
          this.mensagem = 'Erro ao buscar o pedido. Por favor, tente novamente.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        }
      });
    } else {
      this.mensagem = 'Por favor, insira um código de pedido válido.';
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