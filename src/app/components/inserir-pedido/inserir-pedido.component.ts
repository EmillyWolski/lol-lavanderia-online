import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido/pedido.service';

@Component({
  selector: 'app-inserir-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './inserir-pedido.component.html',
  styleUrl: './inserir-pedido.component.css',
})
export class InserirPedidoComponent {
  @ViewChild('formPedido') formPedido!: NgForm;
  pedido: Pedido = new Pedido();
  constructor(private pedidoService: PedidoService, private router: Router) {}

  inserir(): void {
    if (this.formPedido.form.valid) {
      this.pedidoService.inserir(this.pedido);
      this.router.navigate(['/fazer-pedido']);
    }
  }
}
