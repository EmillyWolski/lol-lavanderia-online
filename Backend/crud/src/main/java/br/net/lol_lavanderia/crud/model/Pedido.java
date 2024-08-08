package br.net.lol_lavanderia.crud.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Pedido {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idpedido")
  private long idPedido;

  @ManyToOne
  @JoinColumn(name = "usuario_id")
  private Usuario usuario;

  @Column(name = "statuspedido")
  private String statusPedido;

  @Column(name = "valorpedido")
  private double valorPedido;

  private int prazo;

  @Column(name = "datadopedido")
  private String dataDoPedido;

  @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonManagedReference
  private List<PecaRoupaQnt> pecaRoupaQnt;

  public Pedido() {
  }

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