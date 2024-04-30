import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { Roupas } from '../../../shared/models/shared/models/roupas.model';
import { NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from "ngx-currency";

@Component({
  selector: 'app-manutencao-roupas',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, NgxMaskPipe, NgxCurrencyDirective],
  templateUrl: './manutencao-roupas.component.html',
  styleUrl: './manutencao-roupas.component.css',
})

export class ManutencaoRoupasComponent {

  roupas: Roupas[] = [];

  constructor(private roupaService: RoupasService) { }

  ngOnInit(): void {
    this.roupas = this.listarTodas();
  }

  listarTodas(): Roupas[] {
    return this.roupaService.listarTodas();
  }

  remover($event: any, roupa: Roupas): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a peça de roupa ${roupa.nome}?`)) {
      this.roupaService.remover(roupa.id!);
      this.roupas = this.listarTodas();
    }
  }

}
