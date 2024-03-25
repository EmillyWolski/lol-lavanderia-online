import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultarPedidoService {

  // Array de pedidos (exemplo)
  private pedidos: any[] = [
    { id: 1, cliente: 'Cliente A', status: 'Entregue' },
    { id: 2, cliente: 'Cliente B', status: 'Em aaberto' },
    { id: 3, cliente: 'Cliente C', status: 'Cancelado' },
  ];

  constructor() { }

  // Método para buscar pedidos pelo ID
  buscarPedidoPorId(id: number): any {
    return this.pedidos.find(pedido => pedido.id === id);
  }
}
