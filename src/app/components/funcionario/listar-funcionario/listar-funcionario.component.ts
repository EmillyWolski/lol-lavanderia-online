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
    this.funcionarios = this.listarFuncionarios();
  }

  listarFuncionarios(): PessoaFuncionario[] {
    return this.pessoaFuncionarioService.listarFuncionarios();
  }

  removerFuncionario($event: any, funcionario: PessoaFuncionario): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o(a) funionário(a) ${funcionario.nome}?`)) {
      this.pessoaFuncionarioService.removerFuncionario(funcionario.id!);
      this.funcionarios = this.listarFuncionarios();
    }
  }
}
