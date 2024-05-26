import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { Roupas } from '../../shared/models/shared/models/roupas.model';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './inserir-pedido.component.html',
  styleUrl: './inserir-pedido.component.css',
})
export class InserirPedidoComponent implements OnInit {
  pecasroupas: PecaRoupaQuantidade[] = [];
  pedido: Pedido = new Pedido();

  constructor(
    private pecaroupaService: PecaRoupaQntService,
    private pedidoservice: PedidoService, //injeta os serviços de pedido
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pecasroupas = this.listarTodos();
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

    //calcular o valor total do pedido
    let valorPedido = 0;
    this.pecasroupas.forEach((peca) => {
      valorPedido += peca.quantidade * peca.pecaroupa.valor;
    });

    this.pedidoservice.inserir(this.pedido, this.pecasroupas, valorPedido);

    // Limpa o array pecasroupas
    this.pecaroupaService.removertudo();

    // Redefine o pedido para um novo objeto Pedido
    this.pedido = new Pedido();

    this.router.navigateByUrl('/fazer-pedido');
  }
}
