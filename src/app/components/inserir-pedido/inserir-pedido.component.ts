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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, ModalOrcamentoComponent, RouterLink, FormsModule],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
  providers: [PecaRoupaQntService, PedidoService, RoupasService]
})
export class InserirPedidoComponent implements OnInit {

  @ViewChild(ModalOrcamentoComponent) modalOrcamento!: ModalOrcamentoComponent;

  pecasroupas: PecaRoupaQuantidade[] = [];
  pedido: Pedido = new Pedido();
  roupas: Roupas[] = [];
  prazosMap: { [id: number]: number } = {};
  valorPedido: number = 0;
  prazoMaximo: number = 0;

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
    const pecas = this.pecaroupaService.listarTodos();
    this.pecasroupas = pecas.length > 0 ? pecas : [];
    this.calcularValoresPedido();
  }

  carregarRoupas(): void {
    this.roupasService.listarTodas().subscribe({
      next: (roupas) => {
        this.roupas = roupas ?? [];
        this.prazosMap = {};
        this.roupas.forEach((roupa: Roupas) => {
          if (roupa.id !== undefined && roupa.prazo !== undefined) {
            this.prazosMap[roupa.id] = roupa.prazo; // Definindo prazos para as roupas
          }
        });
        this.calcularValoresPedido();
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
    return this.pecasroupas.reduce((total, peca) => total + (peca.quantidade * (peca.pecaroupa?.valor || 0)), 0);
  }

  calcularPrazoMaximo(): number {
    return Math.max(...this.pecasroupas.map(peca => peca.pecaroupa?.prazo || 0), 0);
  }

  aprovarPedido(): void {
    this.pedido.idpedido = new Date().getTime();
    this.pedido.arrayPedidosRoupas = [...this.pecasroupas];
    this.pedido.valorpedido = this.valorPedido;
    this.pedido.prazo = this.prazoMaximo;

    this.pedidoservice.inserir(this.pedido, this.pedido.arrayPedidosRoupas, this.valorPedido).subscribe({
      next: () => {
        this.pedido = new Pedido();
        this.router.navigateByUrl('/fazer-pedido');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao aprovar pedido:', err.message);
      }
    });
  }

  onRecusar(): void {
    this.pedido.recusarPedido();
  }

  remover(event: Event, pecaroupa: PecaRoupaQuantidade): void {
    event.preventDefault();
    this.pecasroupas = this.pecasroupas.filter(pr => pr !== pecaroupa);
    this.calcularValoresPedido();
  }
}
