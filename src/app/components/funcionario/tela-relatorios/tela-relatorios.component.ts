import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-relatorios',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './tela-relatorios.component.html',
  styleUrl: './tela-relatorios.component.css'
})
export class TelaRelatoriosComponent {

}
