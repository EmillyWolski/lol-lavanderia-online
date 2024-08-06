import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, ModalOrcamentoComponent, RouterLink],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
  providers: [PecaRoupaQntService, PedidoService, RoupasService],
})
export class InserirPedidoComponent implements OnInit {
  @ViewChild(ModalOrcamentoComponent) modalOrcamento!: ModalOrcamentoComponent;

  pecasroupas: PecaRoupaQuantidade[] = []; // Array de peças
  pedido: Pedido = new Pedido();
  roupas: Roupas[] = [];
  prazosMap: { [id: number]: number } = {}; // Mapa de prazos
  valorPedido: number = 0;
  prazoMaximo: number = 0;

  constructor(
    private pecaroupaService: PecaRoupaQntService,
    private pedidoservice: PedidoService,
    private router: Router,
    private roupasService: RoupasService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.carregarPecasRoupas();
    this.carregarRoupas();
  }

  carregarPecasRoupas(): void {
    try {
      const pecas = this.pecaroupaService.listarTodos();
      this.pecasroupas = pecas ?? [];
      this.calcularValoresPedido();
    } catch (error: any) {
      console.error('Erro ao carregar peças de roupas:', error.message);
    }
  }

  carregarRoupas(): void {
    this.roupasService.listarTodasComPrazos().subscribe({
      next: (data) => {
        if (data) {
          this.roupas = data.roupas;
          this.prazosMap = data.prazosMap;
          this.calcularValoresPedido();
        } else {
          this.roupas = [];
          this.prazosMap = {};
        }
      },
      error: (err) => {
        console.error(
          'Erro ao carregar roupas:',
          (err as HttpErrorResponse).message
        );
      },
    });
  }

  abrirModal(): void {
    if (this.modalOrcamento) {
      this.modalOrcamento.open();
    }
  }

  calcularValoresPedido(): void {
    this.valorPedido = this.calcularValorPedido();
    this.prazoMaximo = this.calcularPrazoMaximo();
  }

  calcularValorPedido(): number {
    let valorPedido = 0;
    this.pecasroupas.forEach((peca) => {
      valorPedido += peca.quantidade * (peca.pecaroupa?.valor || 0); // Acessando valor corretamente
    });
    return valorPedido;
  }

  calcularPrazoMaximo(): number {
    let prazoMaximo = 0;
    this.pecasroupas.forEach((peca) => {
      if (peca.pecaroupa?.prazo && peca.pecaroupa.prazo > prazoMaximo) {
        prazoMaximo = peca.pecaroupa.prazo; // Acessando prazo corretamente
      }
    });
    return prazoMaximo;
  }

  //insere um pedido aprovado
  aprovarPedido(): void {
    this.pedido.idPedido = new Date().getTime(); // Gerando um ID único
    this.pedido.usuario = this.loginService.usuarioLogado;

    // Certifique-se de que pecasroupas está corretamente definido
    const pecasroupas = this.pecaroupaService.listarTodos();
    if (pecasroupas.length === 0) {
      alert('Nenhuma peça de roupa adicionada.');
      return;
    }

    this.pedido.pecaRoupaQnt = pecasroupas; // Atribuindo as peças ao pedido
    this.pedido.valorPedido = this.valorPedido;
    this.pedido.prazo = this.prazoMaximo;
    this.pedido.dataDoPedido = new Date(); // Adiciona a data do pedido
    this.pedido.statusPedido = 'EM ABERTO';

    this.pedidoservice.inserir(this.pedido).subscribe({
      next: () => {
        this.pedido = new Pedido(); // Reinicia o pedido
        this.router.navigateByUrl('/fazer-pedido');
        this.pecaroupaService.removertudo(); // Limpa o localStorage após o pedido ser realizado
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao aprovar pedido:', err.message);
        alert('Erro ao aprovar pedido.');
      },
    });
  }

  //insere um pedido recusado
  onRecusar(): void {
    this.pedido.idPedido = new Date().getTime(); // Gerando um ID único
    this.pedido.usuario = this.loginService.usuarioLogado;

    // Certifique-se de que pecasroupas está corretamente definido
    const pecasroupas = this.pecaroupaService.listarTodos();
    if (pecasroupas.length === 0) {
      alert('Nenhuma peça de roupa adicionada.');
      return;
    }

    this.pedido.pecaRoupaQnt = pecasroupas; // Atribuindo as peças ao pedido
    this.pedido.valorPedido = this.valorPedido;
    this.pedido.prazo = this.prazoMaximo;
    this.pedido.dataDoPedido = new Date(); // Adiciona a data do pedido
    this.pedido.statusPedido = 'REJEITADO';

    this.pedidoservice.inserir(this.pedido).subscribe({
      next: () => {
        this.pedido = new Pedido(); // Reinicia o pedido
        this.router.navigateByUrl('/fazer-pedido');
        this.pecaroupaService.removertudo(); // Limpa o localStorage após o pedido ser realizado
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao recusar pedido:', err.message);
        alert('Erro ao recusar pedido.');
      },
    });
  }

  //remove do localstorage a roupa passda
  remover(pecaroupa: PecaRoupaQuantidade): void {
    // Remove a peça do serviço
    this.pecaroupaService.remover(pecaroupa.id);

    // Atualiza a lista de peças de roupas no componente
    this.pecasroupas = this.pecasroupas.filter((pr) => pr.id !== pecaroupa.id);

    // Recalcula os valores do pedido
    this.calcularValoresPedido();
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
