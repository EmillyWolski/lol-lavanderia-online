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

@Component({
  selector: 'app-formulario-peca-roupa',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
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
    this.listarTodasRoupas();
  }

  listarTodasRoupas(): void {
    this.roupas_service.listarTodas().subscribe(
      data => {
        this.roupas = data;
      },
      error => {
        console.error('Erro ao listar roupas:', error);
      }
    );
  }

  inserir(): void {
    if (this.formPecaRoupa.form.valid) {
      this.pecasroupaqntservice.inserir(this.pecaroupaqnt);
      this.router.navigate(['/inserir-pedido']);
      confirm('Peça adicionada com sucesso no pedido.');
    }
  }
}
