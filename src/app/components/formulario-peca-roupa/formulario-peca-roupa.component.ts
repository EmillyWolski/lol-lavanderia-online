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
  selector: 'app-formulario-peca-roupa',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule, NgSelectModule],
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
    private roupas_service: RoupasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roupas_service.listarTodas().subscribe({
      next: (roupas) => {
        this.roupas = roupas ?? [];
      },
      error: (err) => {
        console.error('Erro ao carregar roupas:', err.message);
        alert('Erro ao carregar roupas.');
      }
    });
  }

  inserir(): void {
    if (this.formPecaRoupa.form.valid) {
      this.pecasroupaqntservice.inserir(this.pecaroupaqnt).subscribe({
        next: () => {
          this.router.navigate(['/inserir-pedido']);
          alert('Peça adicionada com sucesso no pedido.');
        },
        error: (err) => {
          console.error('Erro ao adicionar peça de roupa:', err.message);
          alert('Erro ao adicionar peça de roupa.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
