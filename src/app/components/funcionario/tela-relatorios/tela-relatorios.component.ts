import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { AutocadastroService } from '../../../services/autocadastro/autocadastro.service';

@Component({
  selector: 'app-tela-relatorios',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './tela-relatorios.component.html',
  styleUrl: './tela-relatorios.component.css'
})

export class TelaRelatoriosComponent implements OnInit{

  pessoaLogada: Pessoa | null = null;
  pessoas: Pessoa[] = [];

  constructor(
    private loginService: LoginService,
    private autocadastroService: AutocadastroService
  ) { }

  ngOnInit(): void {
    this.pessoaLogada = this.loginService.getPessoaLogada();
    this.pessoas = this.autocadastroService.listarTodos();
  }
}
