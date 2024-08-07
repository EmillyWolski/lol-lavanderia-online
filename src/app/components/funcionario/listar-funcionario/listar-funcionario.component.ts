import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { PessoaFuncionarioService } from '../../../services/pessoa-funcionario/pessoa-funcionario.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css'],
})
export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Usuario[] = []; // Lista de funcionários
  mensagem: string | null = null; // Mensagem de erro ou sucesso
  mensagem_detalhes: string | null = null; // Detalhes da mensagem de erro

  constructor(
    private pessoaFuncionarioService: PessoaFuncionarioService,
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.listarFuncionarios(); // Carrega os funcionários ao iniciar o componente
  }

  listarFuncionarios(): void {
    this.usuarioService.listarFuncionarios().subscribe(
      (response) => {
        this.funcionarios = response;
      },
      (error) => {
        this.mensagem = 'Erro ao listar funcionários.';
        this.mensagem_detalhes = `[${error.status}] ${error.message}`;
        console.error('Erro ao listar funcionários:', error);
      }
    );
  }

  removerFuncionario($event: any, funcionario: Usuario): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o(a) funcionário(a) ${funcionario.nome}?`)) {
      this.pessoaFuncionarioService.removerFuncionario(funcionario.id!).subscribe(
        (response) => {
          this.funcionarios = this.funcionarios.filter((f) => f.id !== funcionario.id);
          console.log('Funcionário removido com sucesso', response);
        },
        (error) => {
          console.error('Erro ao remover funcionário', error);
        }
      );
    }
  }

  confirmarLogout(event: Event): void {
    event.preventDefault();
    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    }
  }
}
