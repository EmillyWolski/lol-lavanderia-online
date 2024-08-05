import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, ModalOrcamentoComponent],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
  providers: [PecaRoupaQntService, PedidoService], // Certifique-se de que esses serviços estejam exportados
})
export class InserirPedidoComponent implements OnInit {
  
  @ViewChild(ModalOrcamentoComponent) modalOrcamento!: ModalOrcamentoComponent;

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
    this.roupasService.listarTodasComPrazos().subscribe(
      data => {
        this.roupas = data.roupas;
        this.prazosMap = data.prazosMap;
      },
      error => {
        console.error('Erro ao carregar roupas:', error);
      }
    );
  }

  listarTodos(): PecaRoupaQuantidade[] {
    return this.pecaroupaService.listarTodos();
  }

  remover($event: any, pecaroupa: PecaRoupaQuantidade): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a Peça de Roupa ${pecaroupa.pecaroupa.nome}?`)) {
      this.pecaroupaService.remover(pecaroupa.id);
      this.pecasroupas = this.listarTodos();
    }
  }

  // Modal
  abrirModal(): void {
    if (this.modalOrcamento) {
      this.modalOrcamento.open();
    }
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

  // Método chamado ao aprovar o pedido no modal
  aprovarPedido(): void {
    this.pedidoservice.inserir(this.pedido, this.pecasroupas, this.valorPedido || 0);
    this.pecaroupaService.removertudo();
    this.pedido = new Pedido();
    this.router.navigateByUrl('/fazer-pedido');
  }

  onRecusar(): void {
    // Marcar o pedido como recusado
    this.pedido.statuspedido = 'REJEITADO';
    this.pedidoservice.inserir(this.pedido, this.pecasroupas, this.valorPedido || 0);

    this.pedido.cancelamentoRealizado = true;
    this.pedido.pagamentoRealizado = true;
    
    this.pecaroupaService.removertudo();

    this.pedido = new Pedido(); // Limpar o objeto pedido
    this.router.navigateByUrl('/fazer-pedido');
  }
}
