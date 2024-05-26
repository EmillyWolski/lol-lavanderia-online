import { PecaRoupaQuantidade } from './peca-roupa-quantidade.model';

export class Pedido {
  constructor(
    public idpedido: number = 0,
    public datadopedido: Date = new Date(),
    public nomecliente: string = '',
    public statuspedido: string = '',
    public arrayPedidosRoupas: PecaRoupaQuantidade[] = [],
    public valorpedido: number = 0
  ) {}
}
