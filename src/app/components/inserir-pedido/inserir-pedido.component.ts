import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, ModalOrcamentoComponent],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
  providers: [PecaRoupaQntService, PedidoService, RoupasService]
})
export class InserirPedidoComponent implements OnInit {

  @ViewChild(ModalOrcamentoComponent) modalOrcamento!: ModalOrcamentoComponent;

  pecasroupas: PecaRoupaQuantidade[] = []; // Array de peças
  pedido: Pedido = new Pedido(); // Objeto do pedido
  roupas: Roupas[] = []; // Array de roupas
  prazosMap: { [id: number]: number } = {}; // Mapa de prazos
  valorPedido: number = 0; // Valor total do pedido
  prazoMaximo: number = 0; // Prazo máximo

  constructor(
    private pecaroupaService: PecaRoupaQntService,
    private pedidoservice: PedidoService,
    private router: Router,
    private roupasService: RoupasService
  ) { }

  ngOnInit(): void {
    this.carregarPecasRoupas();
    this.carregarRoupas();
  }

  carregarPecasRoupas(): void {
    this.pecaroupaService.listarTodos().subscribe({
      next: (pecas) => {
        this.pecasroupas = pecas ?? [];
        this.calcularValoresPedido();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar peças de roupas:', err.message);
      }
    });
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
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar roupas:', err.message);
      }
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
      valorPedido += peca.quantidade * peca.pecaroupa.valor; // Acessando valor corretamente
    });
    return valorPedido;
  }

  calcularPrazoMaximo(): number {
    let prazoMaximo = 0;
    this.pecasroupas.forEach((peca) => {
      if (peca.pecaroupa.prazo > prazoMaximo) {
        prazoMaximo = peca.pecaroupa.prazo; // Acessando prazo corretamente
      }
    });
    return prazoMaximo;
  }

  aprovarPedido(): void {
    this.pedido.idpedido = new Date().getTime(); // Gerando um ID único
    this.pedido.arrayPedidosRoupas = [...this.pecasroupas]; // Atribuindo as peças ao pedido
    this.pedido.valorpedido = this.valorPedido;
    this.pedido.prazo = this.prazoMaximo;

    // Chamando o serviço de pedidos para inserir o pedido
    this.pedidoservice.inserir(this.pedido, this.pedido.arrayPedidosRoupas, this.valorPedido).subscribe({
      next: () => {
        this.pedido = new Pedido(); // Reinicia o pedido
        this.router.navigateByUrl('/fazer-pedido');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao aprovar pedido:', err.message);
      }
    });
  }

  onRecusar(): void {
    this.pedido.recusarPedido(); // Chama o método para recusar o pedido
  }
}
