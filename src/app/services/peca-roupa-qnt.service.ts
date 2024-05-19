import { Injectable } from '@angular/core';
import { PeçaRoupaQuantidade } from '../shared/models/peça-roupa-quantidade.model';

const LS_CHAVE_PECAROUPAQNT = 'pecaroupaqnt';

@Injectable({
  providedIn: 'root',
})
export class PecaRoupaQntService {
  constructor() {}
  listarTodos(): PeçaRoupaQuantidade[] {
    const pecasroupas = localStorage[LS_CHAVE_PECAROUPAQNT];
    return pecasroupas ? JSON.parse(pecasroupas) : [];
  }

  inserir(pecaroupa: PeçaRoupaQuantidade): void {
    const pecasroupas = this.listarTodos();
    pecaroupa.id = new Date().getTime();
    pecasroupas.push(pecaroupa);

    localStorage[LS_CHAVE_PECAROUPAQNT] = JSON.stringify(pecasroupas);
  }

  buscarPorId(id: number): PeçaRoupaQuantidade | undefined {
    const pecasroupas = this.listarTodos();

    return pecasroupas.find((pecaroupa) => pecaroupa.id === id);
  }

  atualizar(pecaroupa: PeçaRoupaQuantidade): void {
    const pecasroupas = this.listarTodos();
    pecasroupas.forEach((obj, index, objs) => {
      if (pecaroupa.id === obj.id) {
        objs[index] = pecaroupa;
      }
    });
    localStorage[LS_CHAVE_PECAROUPAQNT] = JSON.stringify(pecasroupas);
  }

  remover(id: number): void {
    let pecasroupas = this.listarTodos();

    pecasroupas = pecasroupas.filter((pecaroupa) => pecaroupa.id !== id);

    localStorage[LS_CHAVE_PECAROUPAQNT] = JSON.stringify(pecasroupas);
  }

  removertudo(): void {
    localStorage.removeItem(LS_CHAVE_PECAROUPAQNT);
  }
}
