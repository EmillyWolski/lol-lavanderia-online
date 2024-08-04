import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PecaRoupaQuantidade } from '../../shared/models/peca-roupa-quantidade.model';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

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
  pecaroupaqnt!: PecaRoupaQuantidade; // Mudei para não inicializar com valor padrão
  @ViewChild('formEditarPecaRoupaQnt') formEditarPecaRoupaQnt!: NgForm;
  roupas: Roupas[] = [];

  constructor(
    private pecasroupaqntservice: PecaRoupaQntService,
    private roupaService: RoupasService,
    private route: ActivatedRoute,
    private router: Router
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
        console.error('Erro ao carregar roupas:', (err as HttpErrorResponse).message);
        alert('Erro ao carregar roupas.');
      }
    });
  }

  carregarPecaRoupa(): void {
    const id = +this.route.snapshot.params['id'];
    this.pecasroupaqntservice.buscarPorId(id).subscribe({
      next: (peca) => {
        if (peca) { // Verifica se peca não é null
          this.pecaroupaqnt = peca;
        } else {
          console.error('Peça de roupa não encontrada: id =' + id);
          alert('Peça de roupa não encontrada.');
          this.router.navigate(['/inserir-pedido']);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar peça de roupa: id =' + id, err);
        alert('Erro ao buscar peça de roupa.');
        this.router.navigate(['/inserir-pedido']);
      }
    });
  }

  atualizar(): void {
    if (this.formEditarPecaRoupaQnt.form.valid) {
      this.pecasroupaqntservice.atualizar(this.pecaroupaqnt).subscribe({
        next: () => {
          this.router.navigate(['/inserir-pedido']);
          alert('Peça atualizada com sucesso');
        },
        error: (error) => {
          console.error('Erro ao atualizar peça de roupa:', error.message);
          alert('Erro ao atualizar peça de roupa.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
