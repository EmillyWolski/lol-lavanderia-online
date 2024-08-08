package br.net.lol_lavanderia.crud.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "pecaroupaqnt")
public class PecaRoupaQnt {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private int quantidade;

  @ManyToOne
  @JoinColumn(name = "roupa_id")
  private Roupa pecaroupa;

  @ManyToOne
  @JoinColumn(name = "pedido_id")
  @JsonBackReference
  private Pedido pedido;

  public PecaRoupaQnt() {
  }

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
