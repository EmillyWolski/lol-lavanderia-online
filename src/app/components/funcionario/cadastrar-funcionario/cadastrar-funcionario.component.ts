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
  funcionarioCadastrado: PessoaFuncionario | null = null; // Variável para armazenar o funcionário cadastrado

  constructor(
    private pessoaFuncionarioService: PessoaFuncionarioService,
    private router: Router) { }

  cadastrarFuncionario(): void {
    console.log('Método cadastrarFuncionario() chamado.');
    this.confirmarSenha = this.funcionario.confirmarSenha;
    if (this.formFuncionario.form.valid && this.funcionario.senha === this.confirmarSenha) {
      const cadastroSucesso: boolean = this.pessoaFuncionarioService.cadastrarFuncionario(this.funcionario);
      if (cadastroSucesso) {
        this.router.navigate(["/listar-funcionario"]);
      } else {
        // Permanecer na página para que o usuário possa corrigir o email
        console.log('Cadastro falhou devido a e-mail duplicado.');
      }
    }
  }
}
