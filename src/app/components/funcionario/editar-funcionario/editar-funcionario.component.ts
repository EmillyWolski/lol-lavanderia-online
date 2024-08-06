import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterLink,
} from '@angular/router';
import { Usuario } from '../../../shared/models/usuario.model';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css'],
})
export class EditarFuncionarioComponent implements OnInit {
  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  confirmarSenha: string = '';
  funcionario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']; // Verifica se o id está correto
    console.log('ID recebido:', id); // Imprime o id no console
    this.usuarioService.buscarPorId(id).subscribe({
      next: (res) => {
        if (res) {
          this.funcionario = res;
        } else {
          console.error('Funcionário não encontrado: id = ' + id);
          alert('Funcionário não encontrado.');
          this.router.navigate(['/listar-funcionario']);
        }
      },
      error: (error) => {
        console.error('Erro ao buscar funcionário', error);
        alert('Erro ao buscar funcionário. Por favor, tente novamente.');
        this.router.navigate(['/listar-funcionario']);
      },
    });
  }

  editarFuncionario(): void {
    // Verifica se o formulário é válido
    if (
      this.formFuncionario.form.valid &&
      this.funcionario.senha === this.confirmarSenha
    ) {
      // Efetivamente atualiza o funcionário
      this.usuarioService.alterar(this.funcionario).subscribe({
        next: (response) => {
          alert('Funcionário atualizado com sucesso!');
          // Redireciona
          this.router.navigate(['/listar-funcionario']);
        },
        error: (error) => {
          console.error('Erro ao atualizar funcionário', error);
          alert('Erro ao atualizar funcionário. Por favor, tente novamente.');
        },
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
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
