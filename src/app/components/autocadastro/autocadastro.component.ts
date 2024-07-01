import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AutocadastroService } from '../../services/autocadastro/autocadastro.service';
import { Pessoa } from '../../shared/models/pessoa.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css'
})

export class AutocadastroComponent implements OnInit, OnDestroy{
  
  @ViewChild('autocadastroForm') autocadastroForm!: NgForm;
  pessoa: Pessoa = new Pessoa();
  pessoaCadastrada: Pessoa | null = null;
  senhaGerada: string = "";

  constructor(private autocadastroService: AutocadastroService, private router: Router, private http: HttpClient) {}

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

      if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
          next: (data: any) => {
            if (!data.erro) {
              this.pessoa.rua = data.logradouro;
              this.pessoa.cidade = data.localidade;
              this.pessoa.estado = data.uf;
            } else {
              // CEP não encontrado
              console.log('CEP não encontrado');
            }
          },
          error: (error: any) => {
            console.error('Erro ao buscar o CEP:', error);
          }
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
      this.pessoa.senha = this.senhaGerada;

      const sucesso = this.autocadastroService.inserir(this.pessoa);
      if (sucesso) {
        this.pessoaCadastrada = { ...this.pessoa };
        this.pessoa = new Pessoa();
        this.exibirAlerta();
      } else {
        console.log('Falha ao cadastrar: CPF ou e-mail já cadastrado.');
      }
    }
  }

  exibirAlerta(): void {
    if (this.senhaGerada) {
      alert(`Senha gerada: ${this.senhaGerada}`);
      this.router.navigateByUrl('/inicio/login');
    }
  }

}
