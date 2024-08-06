package br.net.lol_lavanderia.crud.model;

import java.util.Date;
import java.util.List;

public class Pedido {
  private long idPedido;
  private Usuario usuario;
  private String statusPedido;
  private double valorPedido;
  private int prazo;
  private String dataDoPedido;
  private List<PecaRoupaQnt> pecaRoupaQnt;

  public Pedido(long idPedido, Usuario usuario, String statusPedido, double valorPedido, int prazo, String dataDoPedido,
      List<PecaRoupaQnt> pecaRoupaQnt) {
    this.idPedido = idPedido;
    this.usuario = usuario;
    this.statusPedido = statusPedido;
    this.valorPedido = valorPedido;
    this.prazo = prazo;
    this.dataDoPedido = dataDoPedido;
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

  public String getStatusPedido() {
    return statusPedido;
  }

  public void setStatusPedido(String statusPedido) {
    this.statusPedido = statusPedido;
  }

  public double getValorPedido() {
    return valorPedido;
  }

  public void setValorPedido(double valorPedido) {
    this.valorPedido = valorPedido;
  }

  public int getPrazo() {
    return prazo;
  }

  public void setPrazo(int prazo) {
    this.prazo = prazo;
  }

  public String getDataDoPedido() {
    return dataDoPedido;
  }

  public void setDataDoPedido(String dataDoPedido) {
    this.dataDoPedido = dataDoPedido;
  }

  public List<PecaRoupaQnt> getPecaRoupaQnt() {
    return pecaRoupaQnt;
  }

  public void setPecaRoupaQnt(List<PecaRoupaQnt> pecaRoupaQnt) {
    this.pecaRoupaQnt = pecaRoupaQnt;
  }

}