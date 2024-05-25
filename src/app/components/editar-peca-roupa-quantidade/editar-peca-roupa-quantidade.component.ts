import { Component, OnInit, ViewChild } from '@angular/core';
import {
  RouterLink,
  RouterModule,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PeçaRoupaQuantidade } from '../../shared/models/peça-roupa-quantidade.model';
import { PecaRoupaQntService } from '../../services/peca-roupa-qnt.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Roupas } from '../../shared/models/roupas.model';
import { RoupasService } from '../../services/roupas/roupas.service';

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
  styleUrl: './editar-peca-roupa-quantidade.component.css',
})
export class EditarPecaRoupaQuantidadeComponent implements OnInit {
  pecaroupaqnt: PeçaRoupaQuantidade = new PeçaRoupaQuantidade();
  @ViewChild('formEditarPecaRoupaQnt') formEditarPecaRoupaQnt!: NgForm;
  //manter as peças de roupas no combo
  roupas: Roupas[] = [];

  constructor(
    private pecasroupaqntservice: PecaRoupaQntService,
    private roupas_service: RoupasService, //Injeta o serviço de roupas para buscar todas as roupas cadastradas
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roupas = this.roupas_service.listarTodas();
    let id = +this.route.snapshot.params['id'];
    const res = this.pecasroupaqntservice.buscarPorId(id);
    if (res !== undefined) {
      this.pecaroupaqnt = res;
    } else {
      throw new Error('Peça de roupa não encontrada: id =' + id);
    }
  }

  atualizar(): void {
    //Verifica se o formulário é válido
    if (this.formEditarPecaRoupaQnt.form.valid) {
      //efetivamente atauliza o PecaRoupaQnt
      this.pecasroupaqntservice.atualizar(this.pecaroupaqnt);
      //redireciona para inserir-pedido
      this.router.navigate(['/inserir-pedido']);
      confirm('Peça atualizada com sucesso');
    }
  }
}
