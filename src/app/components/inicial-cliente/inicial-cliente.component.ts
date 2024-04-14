import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicial-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './inicial-cliente.component.html',
  styleUrl: './inicial-cliente.component.css'
})
export class InicialClienteComponent {

}
