import { Injectable } from '@angular/core';
import { Roupas } from '../../shared/models/roupas.model';

const LS_CHAVE_ROUPAS = 'roupas';

@Injectable({
  providedIn: 'root',
})
export class RoupasService {
  constructor() {}

  listarTodas(): Roupas[] {
    const roupas = localStorage[LS_CHAVE_ROUPAS];

    // Adicionando log para verificar se as roupas estão no localStorage
    console.log('Roupas no localStorage:', roupas);

    // Precisa do condicional, pois retornar undefined se a chave não existe
    return roupas ? JSON.parse(roupas) : [];
  }

  listarTodasComPrazos(): { roupas: Roupas[], prazosMap: { [id: number]: number } } {
    const roupas = localStorage[LS_CHAVE_ROUPAS];

    // Precisa do condicional, pois retorna undefined se a chave não existe
    if (roupas) {
      const roupasArray: Roupas[] = JSON.parse(roupas);
      const prazosMap: { [id: number]: number } = {};

      // Preenche o mapa de prazos
      roupasArray.forEach((roupa) => {
        prazosMap[roupa.id] = roupa.prazo;
      });

      return { roupas: roupasArray, prazosMap };
    } else {
      return { roupas: [], prazosMap: {} };
    }
  }

  inserir(roupa: Roupas): void {
    // Obtém a lista completa de roupas
    const roupas = this.listarTodas();

    // Seta um ID único
    // Usamos o Timestamp, quantidade de segundos desde 1970
    roupa.id = new Date().getTime();

    // Adiciona no final da lista
    roupas.push(roupa);

    // Armazena no LocalStorage
    localStorage[LS_CHAVE_ROUPAS] = JSON.stringify(roupas);
  }

  buscarPorId(id: number): Roupas | undefined {
    // Obtém a lista completa de roupas
    const roupas = this.listarTodas();

    // Efetua a busca
    // find() : retorna o primeiro elemento da lista que satisfaz a condição, caso contrário, undefined
    return roupas.find((roupa) => roupa.id === id);
  }

  atualizar(roupa: Roupas): void {
    // Obtem a lista completa de roupas
    const roupas = this.listarTodas();

    // Varre a lista de roupas. Quando encontra roupa com mesmo id, altera a lista
    roupas.forEach((obj, index, objs) => {
      if (roupa.id === obj.id) {
        objs[index] = roupa;
      }
    });

    // Armazena a nova lista no LocalStorage
    localStorage[LS_CHAVE_ROUPAS] = JSON.stringify(roupas);
  }

  remover(id: number): void {
    // Obtem a lista completa de roupas
    let roupas = this.listarTodas();

    // filter() : retorna a mesma lista contendo todos os registros que satisfazem a condição
    roupas = roupas.filter((roupa) => roupa.id !== id);

    // Atualiza a lista de roupas
    localStorage[LS_CHAVE_ROUPAS] = JSON.stringify(roupas);
  }
}
