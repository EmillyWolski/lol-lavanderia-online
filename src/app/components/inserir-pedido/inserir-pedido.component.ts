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

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, ModalOrcamentoComponent, RouterLink],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
  providers: [PecaRoupaQntService, PedidoService, RoupasService]
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
    private roupasService: RoupasService
  ) { }

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
        console.error('Erro ao carregar roupas:', (err as HttpErrorResponse).message);
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

  aprovarPedido(): void {
    this.pedido.idpedido = new Date().getTime(); // Gerando um ID único
    this.pedido.arrayPedidosRoupas = [...this.pecasroupas]; // Atribuindo as peças ao pedido
    this.pedido.valorpedido = this.valorPedido;
    this.pedido.prazo = this.prazoMaximo;

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

  remover(event: Event, pecaroupa: PecaRoupaQuantidade): void {
    event.preventDefault(); // Previne o comportamento padrão do evento
    this.pecasroupas = this.pecasroupas.filter(pr => pr !== pecaroupa);
    this.calcularValoresPedido();
  }
}

