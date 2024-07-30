import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PessoaFuncionarioService } from '../../../services/pessoa-funcionario/pessoa-funcionario.service';
import { PessoaFuncionario } from '../../../shared/models/pessoa-funcionario.model';

@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './listar-funcionario.component.html',
  styleUrl: './listar-funcionario.component.css'
})
export class ListarFuncionarioComponent implements OnInit {

  funcionarios: PessoaFuncionario[] = [];

  constructor(private pessoaFuncionarioService: PessoaFuncionarioService) { }

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.pessoaFuncionarioService.listarFuncionarios().subscribe(
      response => {
        this.funcionarios = response;
      },
      error => {
        console.error('Erro ao listar funcionários', error);
      }
    );
  }

  removerFuncionario($event: any, funcionario: PessoaFuncionario): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o(a) funcionário(a) ${funcionario.nome}?`)) {
      this.pessoaFuncionarioService.removerFuncionario(funcionario.id!).subscribe(
        response => {
          this.funcionarios = this.funcionarios.filter(f => f.id !== funcionario.id);
          console.log('Funcionário removido com sucesso', response);
        },
        error => {
          console.error('Erro ao remover funcionário', error);
        }
      );
    }
  }
}
