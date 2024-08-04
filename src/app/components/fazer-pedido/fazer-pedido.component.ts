import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fazer-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  providers: [PedidoService, PecaRoupaQntService],
  templateUrl: './fazer-pedido.component.html',
  styleUrls: ['./fazer-pedido.component.css'],
})
export class FazerPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedido: Pedido = new Pedido();
  pecasRoupa: PecaRoupaQuantidade[] = [];
  valorTotal: number = 0; 
  mensagem: string | null = null;
  mensagem_detalhes: string | null = null;

  constructor(
    private pedidoService: PedidoService,
    private pecaRoupaQntService: PecaRoupaQntService
  ) {}

  ngOnInit(): void {
    this.listarTodos();
    this.carregarPecasRoupa();
  }

  listarTodos(): void {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos ?? [];
      },
      error: (err: HttpErrorResponse) => {
        this.mensagem = 'Erro ao listar pedidos.';
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        console.error('Erro ao listar pedidos:', err);
      },
    });
  }

  carregarPecasRoupa(): void {
    // Certifique-se de que a função listarTodos retorna um Observable
    this.pecaRoupaQntService.listarTodos().subscribe({
      next: (pecas) => {
        this.pecasRoupa = pecas ?? [];
      },
      error: (err: HttpErrorResponse) => {
        this.mensagem = 'Erro ao carregar peças de roupa.';
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        console.error('Erro ao carregar peças de roupa:', err);
      },
    });
  }

  fazerPedido(form: NgForm): void {
    if (form.valid) {
      // Atualiza as propriedades do pedido antes de enviá-lo
      this.pedido.arrayPedidosRoupas = this.pecasRoupa; // Adicionando as peças de roupa
      this.pedido.valorpedido = this.calcularValorTotal(); // Calculando o valor total

      // Inserir pedido com todas as informações necessárias
      this.pedidoService.inserir(this.pedido).subscribe({
        next: () => {
          this.mensagem = 'Pedido realizado com sucesso.';
          form.resetForm();
          this.listarTodos();
        },
        error: (err: HttpErrorResponse) => {
          this.mensagem = 'Erro ao realizar pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao realizar pedido:', err);
        },
      });
    } else {
      this.mensagem = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  calcularValorTotal(): number {
    // Implementar lógica para calcular o valor total das peças de roupa
    return this.pecasRoupa.reduce((total, peca) => total + (peca.valor || 0), 0);
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente cancelar o pedido ${pedido.idpedido}?`)) {
      pedido.statuspedido = 'CANCELADO';
      pedido.pagamentoRealizado = true;
      pedido.cancelamentoRealizado = true;

      this.pedidoService.atualizar(pedido).subscribe({
        next: () => {
          this.mensagem = `O pedido ${pedido.idpedido} foi cancelado.`;
          this.pedidos = this.pedidos.filter(p => p.idpedido !== pedido.idpedido);
        },
        error: (err: HttpErrorResponse) => {
          this.mensagem = 'Erro ao cancelar o pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao cancelar pedido:', err);
        },
      });
    }
  }
}
