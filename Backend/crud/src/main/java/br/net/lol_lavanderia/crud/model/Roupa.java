package br.net.lol_lavanderia.crud.model;

public class Roupa {

  private int id;
  private String nome;
  private double valor;
  private int prazo;

  public Roupa() {
    super();
  }

  public Roupa(int id, String nome, double valor, int prazo) {
    super();
    this.id = id;
    this.nome = nome;
    this.valor = valor;
    this.prazo = prazo;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
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