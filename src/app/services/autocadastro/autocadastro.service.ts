import { Injectable } from '@angular/core';
import { Pessoa } from '../../shared/models/pessoa.model';

const LS_CHAVE = "pessoas";

@Injectable({
  providedIn: 'root'
})
export class AutocadastroService {

  constructor() { }

  listarTodos(): Pessoa[] {
    const pessoas = localStorage[LS_CHAVE];
    // Precisa do condicional, pois retornar undefined se
    // a chave não existe
    return pessoas ? JSON.parse(pessoas) : [];
  }

  inserir(pessoa: Pessoa): void {
    console.log('Método inserir() foi chamado.');
    
    // Obtém a lista completa de pessoas
    const pessoas = this.listarTodos();
    // Seta um ID único
    // Usamos o Timestamp, quantidade de segundos desde 1970
    pessoa.id = new Date().getTime();
    // Adiciona no final da lista
    pessoas.push(pessoa);
    // Armazena no LocalStorage
    localStorage[LS_CHAVE] = JSON.stringify(pessoas);

    alert("Autocadastro concluído com sucesso!")
  }
}
