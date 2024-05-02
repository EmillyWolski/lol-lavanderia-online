import { Injectable } from '@angular/core';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

const LS_CHAVE_FUNC = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class PessoaFuncionarioService {

  constructor() { }

  listarFuncionarios(): PessoaFuncionario[] {
    const funcionarios = localStorage[LS_CHAVE_FUNC];
    // Precisa do condicional, pois retornar undefined se
    // a chave não existe
    return funcionarios ? JSON.parse(funcionarios) : [];
  }

  cadastrarFuncionario(funcionario: PessoaFuncionario): void {

    console.log('Iniciando o cadastro do funcionário:', funcionario);
    // Obtém a lista completa de pessoas
    const funcionarios = this.listarFuncionarios();
    // Seta um ID único
    // Usamos o Timestamp, quantidade de segundos desde 1970
    funcionario.id = new Date().getTime();
    // Adiciona no final da lista
    funcionarios.push(funcionario);
    // Armazena no LocalStorage
    localStorage[LS_CHAVE_FUNC] = JSON.stringify(funcionarios);
    alert("Cadastro de funcionário(a) concluído com sucesso!")
  }

  buscarPorId(id: number): PessoaFuncionario | undefined {
    // Obtém a lista completa de pessoas
    const funcionarios = this.listarFuncionarios();
    // Efetua a busca
    // find() : retorna o primeiro elemento da lista que
    // satisfaz a condição, caso contrário, undefined
    return funcionarios.find(funcionario => funcionario.id === id);
  }

  editarFuncionario(funcionario: PessoaFuncionario): void {
    // Obtem a lista completa de pessoas
    const funcionarios = this.listarFuncionarios();
    // Varre a lista de pessoas
    // Quando encontra pessoa com mesmo id, altera a lista
    funcionarios.forEach((obj, index, objs) => {
      if (funcionario.id === obj.id) {
        objs[index] = funcionario
      }
    });
    // Armazena a nova lista no LocalStorage
    localStorage[LS_CHAVE_FUNC] = JSON.stringify(funcionarios);

  }

  removerFuncionario(id: number): void {
    // Obtem a lista completa de pessoas
    let funcionarios = this.listarFuncionarios();
    // filter() : retorna a mesma lista contendo todos
    // os registros que satisfazem a condição
    funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);
    // Atualiza a lista de pessoas
    localStorage[LS_CHAVE_FUNC] = JSON.stringify(funcionarios);
  }
}
