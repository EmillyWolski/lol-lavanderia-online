package br.net.lol_lavanderia.crud.model;

public class PecaRoupaQnt {
  private long id;
  private int quantidade;
  private Roupa pecaroupa;
  private Pedido pedido;

  public PecaRoupaQnt(long id, int quantidade, Roupa pecaroupa, Pedido pedido) {
    this.id = id;
    this.quantidade = quantidade;
    this.pecaroupa = pecaroupa;
    this.pedido = pedido;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public int getQuantidade() {
    return quantidade;
  }

  public void setQuantidade(int quantidade) {
    this.quantidade = quantidade;
  }

  public Roupa getPecaroupa() {
    return pecaroupa;
  }

  public void setPecaroupa(Roupa pecaroupa) {
    this.pecaroupa = pecaroupa;
  }

  public Pedido getPedido() {
    return pedido;
  }

  public void setPedido(Pedido pedido) {
    this.pedido = pedido;
  }

}
