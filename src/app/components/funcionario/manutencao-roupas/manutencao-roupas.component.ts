import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manutencao-roupas',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './manutencao-roupas.component.html',
  styleUrl: './manutencao-roupas.component.css',
})
export class ManutencaoRoupasComponent {}
