import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Roupas } from '../../../shared/models/roupas.model';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-cadastrar-peca-roupa',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxCurrencyDirective,
  ],
  templateUrl: './cadastrar-peca-roupa.component.html',
  styleUrl: './cadastrar-peca-roupa.component.css',
})
export class CadastrarPecaRoupaComponent {
  @ViewChild('formRoupa') formRoupa!: NgForm;

  roupa: Roupas = new Roupas();

  constructor(private roupaService: RoupasService, private router: Router) {}

  inserir(): void {
    if (this.formRoupa.form.valid) {
      this.roupaService.inserir(this.roupa);
      alert('Peça adicionada com sucesso!');
      this.router.navigate(['/manutencao-roupas']);
    }
  }
}
