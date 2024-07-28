import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { Roupas } from '../../../shared/models/roupas.model';
import { NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manutencao-roupas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    NgxMaskPipe,
    NgxCurrencyDirective,
    HttpClientModule
  ],
  templateUrl: './manutencao-roupas.component.html',
  styleUrls: ['./manutencao-roupas.component.css'],
})

export class ManutencaoRoupasComponent implements OnInit {
  roupas: Roupas[] = [];

  constructor(private roupaService: RoupasService) {}

  ngOnInit(): void {
    this.listarTodas();
  }

  listarTodas(): void {
    this.roupaService.listarTodas().subscribe(roupas => {
      this.roupas = roupas ?? [];
    });
  }

  remover($event: any, roupa: Roupas): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a peça de roupa ${roupa.nome}?`)) {
      this.roupaService.remover(roupa.id!).subscribe(() => {
        this.listarTodas();
      });
    }
  }
}
