import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-fazer-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './fazer-pedido.component.html',
  styleUrl: './fazer-pedido.component.css'
})
export class FazerPedidoComponent {

}
