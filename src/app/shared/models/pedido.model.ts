import { PecaRoupaQuantidade } from './peca-roupa-quantidade.model';

export class Pedido {
  cancelamentoRealizado: boolean = false;
  pagamentoRealizado: boolean = false;
  constructor(
    public idpedido: number = 0,
    public datadopedido: Date = new Date(),
    public nomecliente: string = '',
    public statuspedido: string = '',
    public arrayPedidosRoupas: PecaRoupaQuantidade[] = [],
    public valorpedido: number = 0,
    public prazo: number = 0
  ) {}
}
