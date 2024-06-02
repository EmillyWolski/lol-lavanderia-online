import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './inserir-pedido.component.html',
  styleUrl: './inserir-pedido.component.css',
  providers: [PecaRoupaQntService, PedidoService],
})

export class InserirPedidoComponent implements OnInit {
  pecasroupas: PecaRoupaQuantidade[] = [];
  pedido: Pedido = new Pedido();
  roupas: Roupas[] = [];
  prazosMap: { [id: number]: number } = {};
  valorPedido: number | undefined;
  prazoMaximo: number | undefined;

  constructor(
    private pecaroupaService: PecaRoupaQntService,
    private pedidoservice: PedidoService,
    private router: Router,
    private roupasService: RoupasService,
  ) { }

  ngOnInit(): void {
    this.pecasroupas = this.listarTodos();
    this.carregarRoupas();
    this.calcularValoresPedido();
  }

  carregarRoupas(): void {
    const { roupas, prazosMap } = this.roupasService.listarTodasComPrazos();
    this.roupas = roupas;
    this.prazosMap = prazosMap;
  }

  listarTodos(): PecaRoupaQuantidade[] {
    return this.pecaroupaService.listarTodos();
  }

  remover($event: any, pecaroupa: PecaRoupaQuantidade): void {
    $event.preventDefault();
    if (
      confirm(
        `Deseja realmente remover a Peça de Roupa ${pecaroupa.pecaroupa.nome}?`
      )
    ) {
      this.pecaroupaService.remover(pecaroupa.id);
      this.pecasroupas = this.listarTodos();
    }
  }

  //insere o pedido com as peças de roupas escolhidas
  inserir($event: any): void {
    $event.preventDefault();

    this.pedidoservice.inserir(this.pedido, this.pecasroupas, this.valorPedido || 0);

    // Limpa o array pecasroupas
    this.pecaroupaService.removertudo();

    // Redefine o pedido para um novo objeto Pedido
    this.pedido = new Pedido();

    this.router.navigateByUrl('/fazer-pedido');

    // this.abrirModal();
  }

  // Método para calcular o valor total do pedido e o prazo máximo entre as peças de roupa
  calcularValoresPedido(): void {
    this.valorPedido = this.calcularValorPedido();
    this.prazoMaximo = this.calcularPrazoMaximo();
  }

  // Método para calcular o valor total do pedido
  calcularValorPedido(): number {
    let valorPedido = 0;
    this.pecasroupas.forEach((peca) => {
      valorPedido += peca.quantidade * peca.pecaroupa.valor;
    });
    return valorPedido;
  }

  // Método para calcular o prazo máximo entre as peças de roupa
  calcularPrazoMaximo(): number {
    let prazoMaximo = 0;
    this.pecasroupas.forEach((peca) => {
      if (peca.pecaroupa.prazo > prazoMaximo) {
        prazoMaximo = peca.pecaroupa.prazo;
      }
    });
    return prazoMaximo;
  }

  // Método para abrir o modal com o resumo do pedido
  abrirModal(): void {
    this.router.navigateByUrl('/modal-orcamento');
  }
}
