import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { LoginFuncionarioService } from '../../services/login/login-funcionario.service';
import { Pessoa } from '../../shared/models/pessoa.model';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
/* LOGIN ANTIGO PRESTAR ATENÇÃO, NAO SERA MAIS USADO*/
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  senha: string = '';

  constructor(
    private loginService: LoginService,
    private loginFuncionarioService: LoginFuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.classList.add('hide-header');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('hide-header');
  }
  /*
  fazerLogin(): void {
    // Tentar fazer login como cliente
    this.loginService
      .login(this.email, this.senha)
      .subscribe((cliente: Pessoa | null) => {
        if (cliente) {
          alert('Login de cliente efetuado com sucesso!');
          // Redirecionar para a tela inicial de cliente
          this.router.navigate(['/inicio-cliente']);
        } else {
          // Se não conseguir fazer login como cliente, tentar fazer login como funcionário
          this.loginFuncionarioService
            .login(this.email, this.senha)
            .subscribe((funcionario: PessoaFuncionario | null) => {
              if (funcionario) {
                alert('Login de funcionario efetuado com sucesso!');
                // Redirecionar para a tela inicial de funcionário
                this.router.navigate(['/inicio-funcionario']);
              } else {
                alert('Credenciais incorretas');
              }
            });
        }
      });
  }
*/
}
