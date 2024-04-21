import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = "";
  senha: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  fazerLogin(): void {
    this.loginService.login(this.email, this.senha).subscribe(
      pessoa => {
        if (pessoa) {
          alert('Login efetuado com sucesso');
          // Redirecionar para a tela inicial de cliente (você pode implementar isso)
          this.router.navigate(['/inicio-cliente']);
        } else {
          alert('Credenciais incorretas');
        }
      }
    );
  }
}
