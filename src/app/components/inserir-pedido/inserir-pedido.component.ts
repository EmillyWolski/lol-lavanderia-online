import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, ModalOrcamentoComponent],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
  providers: [PecaRoupaQntService, PedidoService, RouterModule, RouterLink, Router]
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
    this.pecaroupaService.listarTodos().subscribe({
      next: (pecas) => {
        this.pecasroupas = pecas;
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

  remover($event: any, pecaroupa: PecaRoupaQuantidade): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a Peça de Roupa ${pecaroupa.pecaroupa.nome}?`)) {
      this.pecaroupaService.remover(pecaroupa.id).subscribe({
        next: () => {
          this.carregarPecasRoupas(); // Recarrega a lista de peças após remoção
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao remover peça de roupa:', err.message);
        }
      });
    }
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
      valorPedido += peca.quantidade * peca.pecaroupa.valor;
    });
    return valorPedido;
  }

  calcularPrazoMaximo(): number {
    let prazoMaximo = 0;
    this.pecasroupas.forEach((peca) => {
      if (peca.pecaroupa.prazo > prazoMaximo) {
        prazoMaximo = peca.pecaroupa.prazo;
      }
    });
    return prazoMaximo;
  }

  aprovarPedido(): void {
    this.pedidoservice.inserir(this.pedido, this.pecasroupas, this.valorPedido).subscribe({
      next: () => {
        this.pecaroupaService.removertudo().subscribe({
          next: () => {
            this.pedido = new Pedido();
            this.router.navigateByUrl('/fazer-pedido');
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao remover todas as peças de roupa:', err.message);
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao aprovar pedido:', err.message);
      }
    });
  }

  onRecusar(): void {
    this.pedido.statuspedido = 'REJEITADO';
    this.pedidoservice.inserir(this.pedido, this.pecasroupas, this.valorPedido).subscribe({
      next: () => {
        this.pedido.cancelamentoRealizado = true;
        this.pedido.pagamentoRealizado = true;
        this.pecaroupaService.removertudo().subscribe({
          next: () => {
            this.pedido = new Pedido();
            this.router.navigateByUrl('/fazer-pedido');
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao remover todas as peças de roupa:', err.message);
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao recusar pedido:', err.message);
      }
    });
  }
}
