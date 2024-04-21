import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-funcionario-finalizar-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './modal-funcionario-finalizar-pedido.component.html',
  styleUrl: './modal-funcionario-finalizar-pedido.component.css'
})
export class ModalFuncionarioFinalizarPedidoComponent {

}
