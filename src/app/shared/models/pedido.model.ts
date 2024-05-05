import { Roupas } from './shared/models/roupas.model';

export class Pedido {
  constructor(
    public idpedido: number = 0,
    public datadopedido: Date = new Date(),
    public nomecliente: string = '',
    public statuspedido: string = ''
  ) {}
}
