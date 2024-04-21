import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-cancelar-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './modal-cancelar-pedido.component.html',
  styleUrl: './modal-cancelar-pedido.component.css'
})
export class ModalCancelarPedidoComponent {

}
