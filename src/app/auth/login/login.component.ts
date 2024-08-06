import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../shared/models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const usuarioLogado = this.loginService.usuarioLogado;
    if (usuarioLogado) {
      if (usuarioLogado.perfil === 'FUNCIONARIO') {
        this.router.navigate(['/inicio-funcionario']);
      } else if (usuarioLogado.perfil === 'CLIENTE') {
        this.router.navigate(['/inicio-cliente']);
      } else {
        this.router.navigate(['/login']); // Padrão, se o perfil não corresponder
      }
    } else {
      this.route.queryParams.subscribe((params) => {
        this.message = params['error'];
      });
    }
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe({
        next: (usu) => {
          if (usu != null) {
            this.loginService.usuarioLogado = usu;
            this.loading = false;

            // Redireciona com base no perfil do usuário
            if (usu.perfil === 'FUNCIONARIO') {
              this.router.navigate(['inicio-funcionario']); // Ajuste para a página específica do funcionário
            } else if (usu.perfil === 'CLIENTE') {
              this.router.navigate(['inicio-cliente']); // Ajuste para a página específica do cliente
            } else {
              this.router.navigate(['login']); // Padrão, se o perfil não corresponder
            }
          } else {
            this.loading = false;
            this.message = 'Usuário/senha inválidos.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.message = `Erro efetuando login: ${err.message}`;
        },
      });
    } else {
      this.loading = false;
    }
  }
}
