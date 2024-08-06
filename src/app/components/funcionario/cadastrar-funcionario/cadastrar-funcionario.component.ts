import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../shared/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-cadastrar-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css'],
})
export class CadastrarFuncionarioComponent {
  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario: Usuario = new Usuario();
  confirmarSenha: string = '';
  funcionarioCadastrado: Usuario | null = null; // Variável para armazenar o funcionário

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private loginService: LoginService
  ) {}

  cadastrarFuncionario(): void {
    console.log('Método cadastrarFuncionario() chamado.');
    if (
      this.formFuncionario.form.valid &&
      this.funcionario.senha === this.confirmarSenha
    ) {
      this.funcionario.cpf = '';
      this.funcionario.cep = '';
      this.funcionario.rua = '';
      this.funcionario.cidade = '';
      this.funcionario.estado = '';
      this.funcionario.telefone = '';

      this.usuarioService.inserir(this.funcionario).subscribe({
        next: (response) => {
          console.log('Funcionário cadastrado com sucesso', response);
          alert('Cadastro de funcionário(a) concluído com sucesso!');
          this.router.navigate(['/listar-funcionario']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar funcionário', error);
          if (error.status === 409) {
            alert('Este e-mail já está sendo utilizado por outro funcionário.');
          } else {
            alert('Erro ao cadastrar funcionário. Por favor, tente novamente.');
          }
        },
      });
    }
  }

  // Confirma o logout do usuário
  confirmarLogout(event: Event): void {
    event.preventDefault();

    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }
}
