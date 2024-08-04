package br.net.lol_lavanderia.crud.model;

import java.util.Date;
import java.util.List;

public class Pedido {
  private long idPedido;
  private Usuario usuario;
  private String status;
  private double valorTotal;
  private int prazo;
  private long dataHoraDoPedido;
  private List<PecaRoupaQnt> pecaRoupaQnt;

  public Pedido(long idPedido, Usuario usuario, String status, double valorTotal, int prazo, long dataHoraDoPedido,
      List<PecaRoupaQnt> pecaRoupaQnt) {
    this.idPedido = idPedido;
    this.usuario = usuario;
    this.status = status;
    this.valorTotal = valorTotal;
    this.prazo = prazo;
    this.dataHoraDoPedido = dataHoraDoPedido;
    this.pecaRoupaQnt = pecaRoupaQnt;
  }

  public long getIdPedido() {
    return idPedido;
  }

  public void setIdPedido(long idPedido) {
    this.idPedido = idPedido;
  }

  public Usuario getUsuario() {
    return usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
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

  public long getDataHoraDoPedido() {
    return dataHoraDoPedido;
  }

  public void setDataHoraDoPedido(long dataHoraDoPedido) {
    this.dataHoraDoPedido = dataHoraDoPedido;
  }

  public List<PecaRoupaQnt> getPecaRoupaQnt() {
    return pecaRoupaQnt;
  }

  public void setPecaRoupaQnt(List<PecaRoupaQnt> pecaRoupaQnt) {
    this.pecaRoupaQnt = pecaRoupaQnt;
  }

}