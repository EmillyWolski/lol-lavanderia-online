import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manutencao-pecas-roupa',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './manutencao-pecas-roupa.component.html',
  styleUrl: './manutencao-pecas-roupa.component.css'
})
export class ManutencaoPecasRoupaComponent {

}
