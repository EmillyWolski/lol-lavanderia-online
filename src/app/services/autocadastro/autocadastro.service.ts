import { Injectable } from '@angular/core';
import { Pessoa } from '../../shared/models/pessoa.model';

const LS_CHAVE = 'pessoas';

@Injectable({
  providedIn: 'root',
})

/*NAO ESTA SENDO UTILIZADO*/
/*NAO ESTA SENDO UTILIZADO*/
/*NAO ESTA SENDO UTILIZADO*/
/*NAO ESTA SENDO UTILIZADO*/
/*NAO ESTA SENDO UTILIZADO*/
/*NAO ESTA SENDO UTILIZADO*/
export class AutocadastroService {
  constructor() {}

  listarTodos(): Pessoa[] {
    const pessoas = localStorage[LS_CHAVE];
    // Precisa do condicional, pois retornar undefined se a chave não existe
    return pessoas ? JSON.parse(pessoas) : [];
  }

  inserir(pessoa: Pessoa): boolean {
    console.log('Método inserir() foi chamado.');
    const pessoas = this.listarTodos();

    // Verifica se já existe uma pessoa com o mesmo CPF ou e-mail
    const cpfExistente = pessoas.some((p) => p.cpf === pessoa.cpf);
    const emailExistente = pessoas.some((p) => p.email === pessoa.email);

    if (cpfExistente) {
      alert('Este CPF já está cadastrado.');
      return false;
    }

    if (emailExistente) {
      alert('Este e-mail já está cadastrado.');
      return false;
    }

    pessoa.id = new Date().getTime();
    pessoas.push(pessoa);
    localStorage[LS_CHAVE] = JSON.stringify(pessoas);

    alert('Autocadastro concluído com sucesso!');
    return true;
  }
}
