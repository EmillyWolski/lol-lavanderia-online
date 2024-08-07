import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css'],
})
export class ConsultarPedidoComponent implements OnInit {
  codigoPedido!: number;
  pedido: Pedido | null = null;
  prazoMaximo: number | undefined;
  itensPedido: { nome: string; quantidade: number; preco: number }[] = [];
  mensagem: string | null = null;
  mensagem_detalhes: string | null = null;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.mensagem = null;
    this.mensagem_detalhes = null;

    const pedidoId = Number(this.codigoPedido);
    if (!isNaN(pedidoId)) {
      this.pedidoService.buscarPorId(pedidoId).subscribe({
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
        },
      });
    } else {
      this.mensagem = 'Por favor, insira um código de pedido válido.';
    }
  }

  calcularPrazoMaximo(): void {
    if (this.pedido && this.pedido.pecaRoupaQnt.length > 0) {
      this.prazoMaximo = this.pedido.pecaRoupaQnt.reduce((maxPrazo, item) => {
        return Math.max(maxPrazo, item.pecaroupa.prazo);
      }, 0);
    } else {
      this.prazoMaximo = undefined;
    }
  }

  carregarItensPedido(): void {
    if (this.pedido && this.pedido.pecaRoupaQnt) {
      this.itensPedido = this.pedido.pecaRoupaQnt.map((item) => {
        return {
          nome: item.pecaroupa.nome,
          quantidade: item.quantidade,
          preco: item.pecaroupa.valor,
        };
      });
    } else {
      this.itensPedido = [];
    }
  }

  confirmarLogout(event: Event): void {
    event.preventDefault();
    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
  }
}
