import { Roupas } from './shared/models/roupas.model';

export class PecaRoupaQuantidade {
  constructor(
    public id: number = 0,
    public quantidade: number = 0,
    public pecaroupa: Roupas = new Roupas()
  ) {}
}
