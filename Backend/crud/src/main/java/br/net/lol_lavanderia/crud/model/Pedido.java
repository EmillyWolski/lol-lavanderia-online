package br.net.lol_lavanderia.crud.model;

import java.util.List;

public class Pedido {

  private Cliente cliente;
  private int idPedido;
  private String status;
  private double valorTotal;
  private int prazo;
  private int dataHoraDoPedido;
  private List<PecaRoupaQnt> pecaRoupaQnt;

  public Pedido() {
    super();
  }

  public Pedido(Cliente cliente, int idPedido, String status, double valorTotal, int prazo, int dataHoraDoPedido,
      List<PecaRoupaQnt> pecaRoupaQnt) {
    super();
    this.cliente = cliente;
    this.idPedido = idPedido;
    this.status = status;
    this.valorTotal = valorTotal;
    this.prazo = prazo;
    this.dataHoraDoPedido = dataHoraDoPedido;
    this.pecaRoupaQnt = pecaRoupaQnt;
  }

  public Cliente getCliente() {
    return cliente;
  }

  public void setCliente(Cliente cliente) {
    this.cliente = cliente;
  }

  public int getIdPedido() {
    return idPedido;
  }

  public void setIdPedido(int idPedido) {
    this.idPedido = idPedido;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public double getValorTotal() {
    return valorTotal;
  }

  public void setValorTotal(double valorTotal) {
    this.valorTotal = valorTotal;
  }

  public int getPrazo() {
    return prazo;
  }

  public void setPrazo(int prazo) {
    this.prazo = prazo;
  }

  public int getDataHoraDoPedido() {
    return dataHoraDoPedido;
  }

  public void setDataHoraDoPedido(int dataHoraDoPedido) {
    this.dataHoraDoPedido = dataHoraDoPedido;
  }

  public List<PecaRoupaQnt> getPecaRoupaQnt() {
    return pecaRoupaQnt;
  }

  public void setPecaRoupaQnt(List<PecaRoupaQnt> pecaRoupaQnt) {
    this.pecaRoupaQnt = pecaRoupaQnt;
  }

}