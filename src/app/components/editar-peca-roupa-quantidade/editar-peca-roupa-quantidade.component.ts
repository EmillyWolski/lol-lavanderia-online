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
  pecaroupaqnt: PecaRoupaQuantidade = new PecaRoupaQuantidade(); // Inicializa como um novo objeto
  @ViewChild('formEditarPecaRoupaQnt') formEditarPecaRoupaQnt!: NgForm;
  roupas: Roupas[] = [];

  constructor(
    private pecasroupaqntservice: PecaRoupaQntService,
    private roupas_service: RoupasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarTodasRoupas();
    this.buscarPecaRoupaQuantidade();
  }

  listarTodasRoupas(): void {
    // Primeiro, tenta carregar as roupas do localStorage
    const localStorageItem = localStorage.getItem('roupas');
    if (localStorageItem) {
      const pecas: Roupas[] = JSON.parse(localStorageItem);
      this.roupas = pecas; // Atribui as roupas do localStorage
    }

    // Depois, busca as roupas na API
    this.roupas_service.listarTodas().subscribe(
      (data: Roupas[]) => {
        this.roupas = [...this.roupas, ...data]; // Combina as roupas do localStorage com as da API
      },
      (error) => {
        console.error('Erro ao listar roupas:', error);
      }
    );
  }

  buscarPecaRoupaQuantidade(): void {
    const id = +this.route.snapshot.params['id'];

    // Tenta buscar no localStorage primeiro
    const localStorageItem = localStorage.getItem('pecaroupaqnt');
    if (localStorageItem) {
      const pecas: PecaRoupaQuantidade[] = JSON.parse(localStorageItem);
      const found = pecas.find(peca => peca.id === id);
      if (found) {
        this.pecaroupaqnt = found; // Atribui apenas se encontrado
      }
    }

    // Se não encontrado, busca na API
    if (!this.pecaroupaqnt.id) { // Verifica se o id é válido
      this.pecasroupaqntservice.buscarPorId(id).subscribe(
        (res: PecaRoupaQuantidade | undefined) => {
          if (res) {
            this.pecaroupaqnt = res;
          } else {
            console.error('Peça de roupa não encontrada: id =' + id);
            throw new Error('Peça de roupa não encontrada: id =' + id);
          }
        },
        (error: any) => {
          console.error('Erro ao buscar a peça de roupa na API:', error);
        }
      );
    }
  }

  atualizar(): void {
    if (this.formEditarPecaRoupaQnt.form.valid) {
      // Atualiza tanto no localStorage quanto na API
      this.pecasroupaqntservice.atualizar(this.pecaroupaqnt);

      // Atualiza no localStorage
      const localStorageItem = localStorage.getItem('pecaroupaqnt');
      if (localStorageItem) {
        const pecas: PecaRoupaQuantidade[] = JSON.parse(localStorageItem);
        const index = pecas.findIndex(peca => peca.id === this.pecaroupaqnt.id);
        if (index !== -1) {
          pecas[index] = this.pecaroupaqnt;
          localStorage.setItem('pecaroupaqnt', JSON.stringify(pecas));
        }
      }

      confirm('Peça atualizada com sucesso');
      this.router.navigate(['/inserir-pedido']);
    }
  }
}
