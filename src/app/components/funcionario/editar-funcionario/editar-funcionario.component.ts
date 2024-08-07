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
  funcionario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.usuarioService.buscarPorId(id).subscribe({
      next: (res) => {
        if (res) {
          this.funcionario = res; // A senha deve ser atualizada diretamente aqui
        } else {
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
    if (this.formFuncionario.valid) {
      // Usando trim para evitar problemas de espaços em branco
      const senhaValida = this.funcionario.senha?.trim();  // Verifique se senha não é undefined

      console.log('Senha:', senhaValida);

      this.usuarioService.alterar(this.funcionario).subscribe({
        next: (response) => {
          alert('Funcionário atualizado com sucesso!');
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

  confirmarLogout(event: Event): void {
    event.preventDefault();
    const confirmed = window.confirm('Você realmente deseja sair?');
    if (confirmed) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
  }
}
