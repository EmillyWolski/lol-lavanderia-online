import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  FormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../shared/models/usuario.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css'],
})
export class AutocadastroComponent implements OnInit, OnDestroy {
  @ViewChild('autocadastroForm') autocadastroForm!: NgForm;
  usuario: Usuario = new Usuario();
  usuarioCadastrado: Usuario | null = null;
  senhaGerada: string = '';
  message!: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private http: HttpClient
  ) {}

  // Código para ocultar o cabeçalho padrão do sistema nessa página
  ngOnInit(): void {
    document.body.classList.add('hide-header');
  }

  // Código para ocultar o cabeçalho padrão do sistema nessa página
  ngOnDestroy(): void {
    document.body.classList.remove('hide-header');
  }

  buscarEndereco(cep: string) {
    if (cep) {
      cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

      if (cep.length === 8) {
        // Verifica se o CEP tem 8 dígitos
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
          next: (data: any) => {
            if (!data.erro) {
              this.usuario.rua = data.logradouro;
              this.usuario.cidade = data.localidade;
              this.usuario.estado = data.uf;
            } else {
              // CEP não encontrado
              console.log('CEP não encontrado');
            }
          },
          error: (error: any) => {
            console.error('Erro ao buscar o CEP:', error);
          },
        });
      } else {
        console.log('CEP inválido');
      }
    }
  }

  gerarSenhaAleatoria(): void {
    const senha = Math.floor(1000 + Math.random() * 9000).toString();
    this.senhaGerada = senha;
  }

  inserir(): void {
    if (this.autocadastroForm.form.valid) {
      this.gerarSenhaAleatoria();
      this.usuario.senha = this.senhaGerada;

      this.usuarioService.inserir(this.usuario).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuarioCadastrado = { ...this.usuario };
            this.usuario = new Usuario();
            this.exibirAlerta();
            this.router.navigateByUrl('/login'); // Redireciona para a tela de login após o cadastro
          } else {
            this.message = 'Falha ao cadastrar: CPF ou e-mail já cadastrado.';
          }
        },
        error: (err) => {
          this.message = `Erro ao cadastrar usuário: ${err.message}`;
        },
      });
    }
  }

  exibirAlerta(): void {
    if (this.senhaGerada) {
      alert(`Senha gerada: ${this.senhaGerada}`);
      this.router.navigateByUrl('/inicio/login');
    }
  }

  onFocusTelefone() {
    if (!this.usuario.telefone) {
      this.usuario.telefone = '';
    }
  }

  emailValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const email = control.value as string;
    if (!email) {
      return { required: true };
    }
    if (
      !email.includes('@') ||
      !(email.endsWith('.com') || email.endsWith('.com.br'))
    ) {
      return { emailInvalid: true };
    }
    return null;
  };
}
