import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Roupas } from '../../../shared/models/roupas.model';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  templateUrl: './cadastrar-peca-roupa.component.html',
  styleUrls: ['./cadastrar-peca-roupa.component.css'],
})
export class CadastrarPecaRoupaComponent {
  @ViewChild('formRoupa') formRoupa!: NgForm;

  roupa: Roupas = new Roupas();
  isLoading = false;

  constructor(private roupasService: RoupasService, private router: Router) {}

  inserir(): void {
    if (this.formRoupa.form.valid) {
      this.isLoading = true;
      this.roupasService.inserir(this.roupa).subscribe({
        next: (response) => {
          this.isLoading = false;
          alert('Peça adicionada com sucesso!');
          this.router.navigate(['/manutencao-roupas']);
        },
        error: (error) => {
          this.isLoading = false;
          alert(`Erro ao adicionar a peça: ${error.message}`);
        }
      });
    }
  }
}
