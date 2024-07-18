package br.net.lol_lavanderia.crud.model;

public class Roupa {

  private int roupaId;
  private String nome;
  private double valor;
  private int prazo;

  public Roupa() {
    super();
  }

  public Roupa(int roupaId, String nome, double valor, int prazo) {
    super();
    this.roupaId = roupaId;
    this.nome = nome;
    this.valor = valor;
    this.prazo = prazo;
  }

  public int getRoupaId() {
    return roupaId;
  }

  public void setRoupaId(int roupaId) {
    this.roupaId = roupaId;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public double getValor() {
    return valor;
  }

  public void setValor(double valor) {
    this.valor = valor;
  }

  public int getPrazo() {
    return prazo;
  }

  public void setPrazo(int prazo) {
    this.prazo = prazo;
  }

}