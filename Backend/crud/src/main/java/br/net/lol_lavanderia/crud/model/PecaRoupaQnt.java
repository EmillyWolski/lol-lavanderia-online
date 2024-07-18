package br.net.lol_lavanderia.crud.model;

public class PecaRoupaQnt {
  private Roupa roupa;
  private int quantidade;

  public PecaRoupaQnt() {
    super();
    // TODO Auto-generated constructor stub
  }

  public PecaRoupaQnt(Roupa roupa, int quantidade) {
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
}
