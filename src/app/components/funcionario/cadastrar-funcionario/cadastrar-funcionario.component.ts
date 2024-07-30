import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PessoaFuncionario } from '../../../shared/models/pessoa-funcionario.model';
import { PessoaFuncionarioService } from '../../../services/pessoa-funcionario/pessoa-funcionario.service';

@Component({
  selector: 'app-cadastrar-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.css'
})
export class CadastrarFuncionarioComponent {

  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario: PessoaFuncionario = new PessoaFuncionario();
  confirmarSenha: string = '';
  funcionarioCadastrado: PessoaFuncionario | null = null; // Variavel para armazenar o funcionário 

  constructor(
    private pessoaFuncionarioService: PessoaFuncionarioService,
    private router: Router) { }

  cadastrarFuncionario(): void {
    console.log('Método cadastrarFuncionario() chamado.');
    this.confirmarSenha = this.funcionario.confirmarSenha;
    if (this.formFuncionario.form.valid && this.funcionario.senha === this.confirmarSenha) {
      this.pessoaFuncionarioService.cadastrarFuncionario(this.funcionario).subscribe(
        response => {
          console.log('Funcionário cadastrado com sucesso', response);
          alert('Cadastro de funcionário(a) concluído com sucesso!');
          this.router.navigate(['/listar-funcionario']);
        },
        error => {
          console.error('Erro ao cadastrar funcionário', error);
          if (error.status === 409) {
            alert('Este e-mail já está sendo utilizado por outro funcionário.');
          } else {
            alert('Erro ao cadastrar funcionário. Por favor, tente novamente.');
          }
        }
      );
    }
  }
}
