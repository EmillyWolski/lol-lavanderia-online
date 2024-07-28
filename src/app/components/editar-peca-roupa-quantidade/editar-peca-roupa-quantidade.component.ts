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
  // Instancia uma nova peça de roupa com quantidade
  pecaroupaqnt: PecaRoupaQuantidade = new PecaRoupaQuantidade();

  // Referência ao formulário de edição
  @ViewChild('formEditarPecaRoupaQnt') formEditarPecaRoupaQnt!: NgForm;

  // Lista de roupas para popular o combo box
  roupas: Roupas[] = [];

  constructor(
    private pecasroupaqntservice: PecaRoupaQntService, // Serviço para manipulação de peças de roupa
    private roupas_service: RoupasService, // Serviço para manipulação de roupas
    private route: ActivatedRoute, // Serviço para acessar parâmetros da rota
    private router: Router // Serviço para navegação
  ) {}

  ngOnInit(): void {
    // Carrega a lista de roupas ao inicializar o componente
    this.roupas_service.listarTodas().subscribe({
      next: (roupas) => {
        this.roupas = roupas ?? [];
      },
      error: (err) => {
        console.error('Erro ao carregar roupas:', err.message);
      }
    });

    // Obtém o ID da peça de roupa da URL
    const id = +this.route.snapshot.params['id'];

    // Busca a peça de roupa por ID
    this.pecasroupaqntservice.buscarPorId(id).subscribe({
      next: (peca) => {
        if (peca) {
          this.pecaroupaqnt = peca;
        } else {
          console.error('Peça de roupa não encontrada: id =' + id);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar peça de roupa:', err.message);
      }
    });
  }

  atualizar(): void {
    // Verifica se o formulário é válido antes de atualizar
    if (this.formEditarPecaRoupaQnt.form.valid) {
      // Atualiza a peça de roupa com base nas informações do formulário
      this.pecasroupaqntservice.atualizar(this.pecaroupaqnt).subscribe({
        next: () => {
          // Redireciona para a página de inserir pedido após atualização
          this.router.navigate(['/inserir-pedido']);
          alert('Peça atualizada com sucesso');
        },
        error: (err) => {
          console.error('Erro ao atualizar peça de roupa:', err.message);
        }
      });
    }
  }
}
