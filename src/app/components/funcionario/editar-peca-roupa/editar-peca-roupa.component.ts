import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { Roupas } from '../../../shared/models/roupas.model';
import { FormsModule, NgForm } from '@angular/forms';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-editar-peca-roupa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxCurrencyDirective,
  ],
  templateUrl: './editar-peca-roupa.component.html',
  styleUrls: ['./editar-peca-roupa.component.css'],
})
export class EditarPecaRoupaComponent implements OnInit {
  @ViewChild('formRoupa') formRoupa!: NgForm;

  roupa: Roupas = new Roupas();

  constructor(
    private roupaService: RoupasService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    if (isNaN(id) || id <= 0) {
      alert('ID inválido');
      this.router.navigate(['/manutencao-roupas']);
      return;
    }

    console.log(`ID recebido: ${id}`);

    this.roupaService.buscarPorId(id).subscribe({
      next: (res) => {
        if (res) {
          this.roupa = res;
          console.log(`Roupa encontrada: ${JSON.stringify(this.roupa)}`);
        } else {
          alert('Roupa não encontrada: id = ' + id);
          this.router.navigate(['/manutencao-roupas']);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar a roupa:', err.message);
        alert('Erro ao buscar a roupa.');
        this.router.navigate(['/manutencao-roupas']);
      },
    });
  }

  atualizar(): void {
    if (this.formRoupa.form.valid) {
      // Verifica se o ID está definido corretamente
      if (!this.roupa.id) {
        alert('ID da roupa não encontrado. Não é possível atualizar.');
        return;
      }

      this.roupaService.atualizar(this.roupa).subscribe({
        next: () => {
          alert('Peça atualizada com sucesso!');
          this.router.navigate(['/manutencao-roupas']);
        },
        error: (err) => {
          console.error('Erro ao atualizar a roupa:', err.message);
          alert('Erro ao atualizar a roupa.');
        },
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  // Confirma o logout do usuário
  confirmarLogout(event: Event): void {
    event.preventDefault();

    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }
}
