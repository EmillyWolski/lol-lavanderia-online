import { Roupas } from './roupas.model';

export class PeçaRoupaQuantidade {
  constructor(
    public id: number = 0,
    public quantidade: number = 0,
    public pecaroupa: Roupas = new Roupas()
  ) {}
}
