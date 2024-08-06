import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
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
  selector: 'app-formulario-peca-roupa',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink],
  templateUrl: './formulario-peca-roupa.component.html',
  styleUrls: ['./formulario-peca-roupa.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FormularioPecaRoupaComponent implements OnInit {
  @ViewChild('formPecaRoupa') formPecaRoupa!: NgForm;

  pecaroupaqnt: PecaRoupaQuantidade = new PecaRoupaQuantidade();
  roupas: Roupas[] = [];

  constructor(
    private pecasroupaqntservice: PecaRoupaQntService,
    private roupasService: RoupasService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.carregarRoupas();
  }

  carregarRoupas(): void {
    this.roupasService.listarTodas().subscribe({
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

  inserir(): void {
    if (this.formPecaRoupa.form.valid) {
      const id = this.pecaroupaqnt.pecaroupa.id;
      if (id !== undefined && id !== null) {
        this.roupasService.buscarPorId(id).subscribe({
          next: (pecaSelecionada) => {
            if (pecaSelecionada) {
              this.pecaroupaqnt.pecaroupa.nome = pecaSelecionada.nome;
              this.pecaroupaqnt.pecaroupa.valor = pecaSelecionada.valor;
              this.pecaroupaqnt.pecaroupa.prazo = pecaSelecionada.prazo;

              // Inserir a peça de roupa completa no localStorage
              this.pecasroupaqntservice.inserir(this.pecaroupaqnt);
              this.router.navigate(['/inserir-pedido']);
              alert('Peça adicionada com sucesso no pedido.');
            } else {
              alert('Peça não encontrada.');
            }
          },
          error: (err) => {
            console.error(
              'Erro ao buscar peça de roupa:',
              (err as HttpErrorResponse).message
            );
            alert('Erro ao buscar peça de roupa.');
          },
        });
      } else {
        alert('Por favor, selecione uma peça de roupa válida.');
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
      this.router.navigate(['/login']);
    }
  }
}
