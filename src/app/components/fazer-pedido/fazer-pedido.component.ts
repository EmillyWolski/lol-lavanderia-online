import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { LoginService } from '../../services/login/login.service';

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
    private pecaRoupaQntService: PecaRoupaQntService,
    private router: Router,
    private loginService: LoginService
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
      error: (err) => {
        this.mensagem = 'Erro ao listar pedidos.';
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        console.error('Erro ao listar pedidos:', err);
      },
    });
  }

  carregarPecasRoupa(): void {
    this.pecasRoupa = this.pecaRoupaQntService.listarTodos();
  }
  /*
  fazerPedido(form: NgForm): void {
    if (form.valid) {
      this.pedidoService
        .inserir(this.pedido, this.pecasRoupa, this.valorTotal)
        .subscribe({
          next: () => {
            this.mensagem = 'Pedido realizado com sucesso.';
            form.resetForm();
            this.listarTodos();
          },
          error: (err) => {
            this.mensagem = 'Erro ao realizar pedido.';
            this.mensagem_detalhes = `[${err.status}] ${err.message}`;
            console.error('Erro ao realizar pedido:', err);
          },
        });
    } else {
      this.mensagem = 'Por favor, preencha todos os campos corretamente.';
    }
  }
*/
  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente cancelar o pedido ${pedido.idPedido}?`)) {
      pedido.statusPedido = 'CANCELADO';
      pedido.pagamentoRealizado = true;
      pedido.cancelamentoRealizado = true;

      this.pedidoService.alterar(pedido).subscribe({
        next: () => {
          this.mensagem = `O pedido ${pedido.idPedido} foi cancelado.`;
          this.pedidos = this.pedidos.filter(
            (p) => p.idPedido !== pedido.idPedido
          );
        },
        error: (err) => {
          this.mensagem = 'Erro ao cancelar o pedido.';
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          console.error('Erro ao cancelar pedido:', err);
        },
      });
    }
  }

  // Confirma o logout do usuário
  confirmarLogout(event: Event): void {
    event.preventDefault();

    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }
}
