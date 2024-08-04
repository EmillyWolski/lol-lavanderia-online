import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { RoupasService } from '../../services/roupas/roupas.service';
import { Pedido } from '../../shared/models/pedido.model';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/roupas.model';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, NgSelectModule, RouterLink, ModalOrcamentoComponent],
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css'],
})
export class InserirPedidoComponent implements OnInit {
  form!: FormGroup;
  roupas: Roupas[] = [];
  arrayPedidosRoupas: PecaRoupaQuantidade[] = [];
  pedido: Pedido = new Pedido();
  valorPedido: number = 0;
  prazoMaximo: number = 0;
  prazosMap: { [id: number]: number } = {};

  @ViewChild(ModalOrcamentoComponent) modalOrcamento!: ModalOrcamentoComponent;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private roupasService: RoupasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      clienteId: [null, Validators.required],
      prazo: [null, Validators.required]
    });

    this.carregarRoupas();
  }

  carregarRoupas(): void {
    this.roupasService.listarTodas().subscribe({
      next: (roupas: Roupas[] | null) => {
        if (roupas) {
          this.roupas = roupas;
          this.prazosMap = roupas.reduce((map, roupa) => {
            map[roupa.id] = roupa.prazo;
            return map;
          }, {} as { [id: number]: number });
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar roupas:', error);
      }
    });
  }

  adicionarPecaRoupa(pecaRoupaQuantidade: PecaRoupaQuantidade): void {
    if (pecaRoupaQuantidade && pecaRoupaQuantidade.id) {
      this.arrayPedidosRoupas.push(pecaRoupaQuantidade);
      this.atualizarValores();
      console.log('Peça adicionada:', pecaRoupaQuantidade);
    } else {
      console.error('Peça de roupa inválida:', pecaRoupaQuantidade);
    }
  }

  removerPecaRoupa(id: number): void {
    this.arrayPedidosRoupas = this.arrayPedidosRoupas.filter(peca => peca.id !== id);
    this.atualizarValores();
    console.log('Peça de roupa removida com sucesso!');
  }

  atualizarValores(): void {
    this.valorPedido = this.calcularValorTotal();
    this.prazoMaximo = this.calcularPrazoMaximo();
  }

  calcularValorTotal(): number {
    return this.arrayPedidosRoupas.reduce((total, peca) => total + (peca.valor || 0), 0);
  }

  calcularPrazoMaximo(): number {
    return Math.max(...this.arrayPedidosRoupas.map(peca => this.prazosMap[peca.pecaroupa.id] || 0), 0);
  }

  abrirModal(): void {
    if (this.modalOrcamento) {
      this.modalOrcamento.open();
    }
  }

  aprovarPedido(): void {
    if (this.form.valid) {
      if (this.arrayPedidosRoupas.length === 0) {
        alert('Adicione pelo menos uma peça ao pedido.');
        return;
      }

      // Preencher o pedido antes de enviar
      this.pedido.nomecliente = ''; 
      this.pedido.statuspedido = ''; 
      this.pedido.arrayPedidosRoupas = [...this.arrayPedidosRoupas]; 
      this.pedido.valorpedido = this.valorPedido; 
      this.pedido.prazo = this.prazoMaximo; 
      this.pedido.clienteId = this.form.value.clienteId; // Captura o cliente do formulário

      // Chame o serviço de pedido com um único argumento
      this.pedidoService.inserir(this.pedido).subscribe({
        next: () => {
          console.log('Pedido aprovado com sucesso:', this.pedido);
          this.pedido = new Pedido(); // Reinicia a instância do pedido
          this.arrayPedidosRoupas = []; // Limpa o array de peças
          this.router.navigateByUrl('/fazer-pedido');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao aprovar pedido:', err.message);
          alert('Ocorreu um erro ao aprovar o pedido. Tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  onRecusar(): void {
    this.pedido.recusarPedido();
  }
}

