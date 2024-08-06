import { PecaRoupaQuantidade } from './peca-roupa-quantidade.model';
import { Usuario } from './usuario.model';

export class Pedido {
  cancelamentoRealizado: boolean = false;
  pagamentoRealizado: boolean = false;
  clienteId: number = 0;

  constructor(
    public idPedido: number = 0,
    public usuario: Usuario = new Usuario(
      0,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'CLIENTE'
    ),
    public statusPedido: string = '',
    public valorPedido: number = 0,
    public prazo: number = 0,
    public dataDoPedido: Date = new Date(),
    public pecaRoupaQnt: PecaRoupaQuantidade[] = []
  ) {}
}
