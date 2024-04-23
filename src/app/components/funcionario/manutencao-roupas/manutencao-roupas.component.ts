import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { Roupas } from '../../../shared/models/shared/models/roupas.model';

@Component({
  selector: 'app-manutencao-roupas',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './manutencao-roupas.component.html',
  styleUrl: './manutencao-roupas.component.css',
})

export class ManutencaoRoupasComponent {

  roupas : Roupas[] = [];

  constructor (private roupaService: RoupasService) {}

  ngOnInit(): void {
    this.roupas = this.listarTodas();
  }

  listarTodas(): Roupas[] {
    return this.roupaService.listarTodas();
  }

}
