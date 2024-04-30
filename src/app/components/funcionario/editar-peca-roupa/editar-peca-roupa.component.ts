import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Roupas } from '../../../shared/models/shared/models/roupas.model';
import { FormsModule, NgForm } from '@angular/forms';
import { RoupasService } from '../../../services/roupas/roupas.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from "ngx-currency";

@Component({
  selector: 'app-editar-peca-roupa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, NgxMaskDirective, NgxMaskPipe, NgxCurrencyDirective],
  templateUrl: './editar-peca-roupa.component.html',
  styleUrl: './editar-peca-roupa.component.css',
})

export class EditarPecaRoupaComponent implements OnInit {

  @ViewChild('formRoupa') formRoupa!: NgForm;

  roupa: Roupas = new Roupas();

  constructor(
    private roupaService: RoupasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    // Com o id, obtém a pessoa
    const res = this.roupaService.buscarPorId(id);
    if (res !== undefined)
      this.roupa = res;
    else
      throw new Error("Roupa não encontrada: id = " + id);
  }


  atualizar(): void {

    // Verifica se o formulário é válido
    if (this.formRoupa.form.valid) {

      // Efetivamente atualiza a roupa
      this.roupaService.atualizar(this.roupa);
      alert('Peça atualizada com sucesso!');

      // Redireciona para /manutencao-roupas
      this.router.navigate(['/manutencao-roupas']);
    }
  }

}

