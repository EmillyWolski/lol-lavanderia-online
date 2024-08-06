import { Component, OnInit, ViewChild } from '@angular/core';
import {
  RouterLink,
  RouterModule,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-editar-peca-roupa-quantidade',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: './editar-peca-roupa-quantidade.component.html',
  styleUrls: ['./editar-peca-roupa-quantidade.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EditarPecaRoupaQuantidadeComponent implements OnInit {
  pecaroupaqnt: PecaRoupaQuantidade = new PecaRoupaQuantidade();
  @ViewChild('formEditarPecaRoupaQnt') formEditarPecaRoupaQnt!: NgForm;
  roupas: Roupas[] = [];

  constructor(
    private pecasroupaqntservice: PecaRoupaQntService,
    private roupaService: RoupasService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.carregarRoupas();
    this.carregarPecaRoupa();
  }

  carregarRoupas(): void {
    this.roupaService.listarTodas().subscribe({
      next: (roupas) => {
        this.roupas = roupas ?? [];
      },
      error: (err) => {
        console.error(
          'Erro ao carregar roupas:',
          (err as HttpErrorResponse).message
        );
        alert('Erro ao carregar roupas.');
      },
    });
  }

  carregarPecaRoupa(): void {
    const id = +this.route.snapshot.params['id'];
    const peca = this.pecasroupaqntservice.buscarPorId(id);
    if (peca) {
      this.pecaroupaqnt = peca;
    } else {
      console.error('Peça de roupa não encontrada: id =' + id);
      alert('Peça de roupa não encontrada.');
      this.router.navigate(['/inserir-pedido']);
    }
  }

  atualizar(): void {
    if (this.formEditarPecaRoupaQnt.form.valid) {
      try {
        this.pecasroupaqntservice.atualizar(this.pecaroupaqnt);
        this.router.navigate(['/inserir-pedido']);
        alert('Peça atualizada com sucesso');
      } catch (error: any) {
        console.error('Erro ao atualizar peça de roupa:', error.message);
        alert('Erro ao atualizar peça de roupa.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
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
