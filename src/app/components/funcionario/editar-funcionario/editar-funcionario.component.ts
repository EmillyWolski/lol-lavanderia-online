import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { PessoaFuncionario } from '../../../shared/models/pessoa-funcionario.model';
import { FormsModule, NgForm } from '@angular/forms';
import { PessoaFuncionarioService } from '../../../services/pessoa-funcionario/pessoa-funcionario.service';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css'],
})
export class EditarFuncionarioComponent implements OnInit {

  @ViewChild('formFuncionario') formFuncionario!: NgForm;

  funcionario: PessoaFuncionario = new PessoaFuncionario();

  constructor(
    private funcionarioService: PessoaFuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id']; // Verifique se 'id' é obtido corretamente
    console.log('ID recebido:', id); // Imprime o valor de 'id' no console
    // Com o id, obtém o funcionário
    const res = this.funcionarioService.buscarPorId(id);
    if (res !== undefined)
      this.funcionario = res;
    else
      throw new Error("Funcionário não encontrado: id = " + id);
  }  

  editarFuncionario(): void {
    // Verifica se o formulário é válido
    if (this.formFuncionario.form.valid) {
      // Efetivamente atualiza o funcionário
      this.funcionarioService.editarFuncionario(this.funcionario);
      alert('Funcionário atualizado com sucesso!');

      // Redireciona
      this.router.navigate(['/listar-funcionario']);
    }
  }
}

