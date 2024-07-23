package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.lol_lavanderia.crud.model.Cliente;
import br.net.lol_lavanderia.crud.model.PecaRoupaQnt;
import br.net.lol_lavanderia.crud.model.Pedido;
import br.net.lol_lavanderia.crud.model.Roupa;

@CrossOrigin
@RestController
public class PedidoREST {

  // instancia de cliente para teste
  public static Cliente cliente = new Cliente("Julio", "julioyamaguchi99@gmail.com", "1234", "10756274940",
      "Rua das peras", "9999999");

  // instancias de roupas para teste
  public static Roupa calca = new Roupa(1, "calca", 4.00, 2);
  public static Roupa camisa = new Roupa(2, "camisa", 5.00, 3);

  // list de pecaRoupaQnt para teste
  public static List<PecaRoupaQnt> listaPeca = new ArrayList<>();
  static {
    listaPeca.add(new PecaRoupaQnt(camisa, 2));
    listaPeca.add(new PecaRoupaQnt(calca, 1));
  }

  // Lista de pedidos para teste
  public static List<Pedido> pedidos = new ArrayList<>();

  // instancia de pedido para teste
  static {
    pedidos.add(new Pedido(cliente, 1, "novo", 22.00, 5, 20230721, listaPeca));
  }

  @GetMapping("/pedidos")
  public ResponseEntity<List<Pedido>> obterTodosPedidos() {
    return ResponseEntity.ok(pedidos);
  }

  @GetMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> obterPedidoPorId(
      @PathVariable("id") long id) {
    Pedido p = pedidos.stream().filter(
        usu -> usu.getIdPedido() == id).findAny().orElse(null);
    if (p == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .build();
    else
      return ResponseEntity.ok(p);
  }

  @PostMapping("/pedidos")
  public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {
    Pedido p = pedidos.stream().filter(usu -> usu.getIdPedido() == pedido.getIdPedido()).findAny().orElse(null);
    if (p != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    } else {
      pedidos.add(pedido);
      return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }
  }

  @PutMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> alterarPedido(@PathVariable("id") long id, @RequestBody Pedido pedido) {
    Pedido p = pedidos.stream().filter(usu -> usu.getIdPedido() == id).findAny().orElse(null);

    if (p != null) {
      p.setCliente(pedido.getCliente());
      p.setStatus(pedido.getStatus());
      p.setValorTotal(pedido.getValorTotal());
      p.setPrazo(pedido.getPrazo());
      p.setPecaRoupaQnt(pedido.getPecaRoupaQnt());
      return ResponseEntity.ok(p);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> removerPedido(@PathVariable("id") long id) {
    Pedido pedido = pedidos.stream().filter(ped -> ped.getIdPedido() == id)
        .findAny().orElse(null);
    if (pedido != null) {
      pedidos.removeIf(p -> p.getIdPedido() == id);
      return ResponseEntity.ok(pedido);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
