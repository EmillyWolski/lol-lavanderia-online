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
  styleUrl: './manutencao-roupas.component.css'
})

export class ManutencaoRoupasComponent {

  roupas : Roupas[] = [];

  constructor (private roupaService: RoupasService) {}

  ngOnInit(): void {
    this.roupas = this.listarTodas();
  }

  listarTodas(): Roupas[] {
    // return this.roupaService.listarTodas();

    return [
      new Roupas(1, "Calça", 12, 1),
      new Roupas(2, "Camisa", 15, 2),
      new Roupas(3, "Camiseta", 8, 1),
      new Roupas(4, "Meia", 5, 1),
      new Roupas(5, "Roupa íntima", 10, 1)
    ]
  }

}
