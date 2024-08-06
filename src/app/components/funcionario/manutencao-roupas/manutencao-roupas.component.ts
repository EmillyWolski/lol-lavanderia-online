import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { Roupas } from '../../../shared/models/roupas.model';
import { NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-manutencao-roupas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    NgxMaskPipe,
    NgxCurrencyDirective,
    HttpClientModule,
  ],
  templateUrl: './manutencao-roupas.component.html',
  styleUrls: ['./manutencao-roupas.component.css'],
})
export class ManutencaoRoupasComponent implements OnInit {
  roupas: Roupas[] = [];

  constructor(
    private roupaService: RoupasService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.listarTodas();
  }

  listarTodas(): void {
    this.roupaService.listarTodas().subscribe({
      next: (roupas) => {
        this.roupas = roupas ?? [];
      },
      error: (error) => {
        console.error(`Erro ao listar roupas: ${error.message}`);
        alert('Erro ao carregar roupas. Tente novamente mais tarde.');
      },
    });
  }

  remover($event: any, roupa: Roupas): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a peça de roupa ${roupa.nome}?`)) {
      this.roupaService.remover(roupa.id).subscribe({
        next: () => {
          this.listarTodas();
        },
        error: (error) => {
          console.error(`Erro ao remover roupa: ${error.message}`);
          alert('Erro ao remover a peça de roupa.');
        },
      });
    }
  }

  confirmarLogout(event: Event): void {
    event.preventDefault();

    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }
}
