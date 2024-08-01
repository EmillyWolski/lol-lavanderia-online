package br.net.lol_lavanderia.crud.model;

public class PecaRoupaQnt {
  private Roupa roupa;
  private int quantidade;
  private Pedido pedido;

  public PecaRoupaQnt() {

  }

  public PecaRoupaQnt(Roupa roupa, int quantidade, Pedido pedido) {
    super();
    this.roupa = roupa;
    this.quantidade = quantidade;
  }

  public Roupa getRoupa() {
    return roupa;
  }

  public void setRoupa(Roupa roupa) {
    this.roupa = roupa;
  }

  public int getQuantidade() {
    return quantidade;
  }

  public void setQuantidade(int quantidade) {
    this.quantidade = quantidade;
  }

  public Pedido getPedido() {
    return pedido;
  }

  public void setPedido(Pedido pedido) {
    this.pedido = pedido;
  }
}
