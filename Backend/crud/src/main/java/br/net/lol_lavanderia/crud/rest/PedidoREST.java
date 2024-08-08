package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import br.net.lol_lavanderia.crud.repository.PedidoRepository;

@CrossOrigin
@RestController
public class PedidoREST {

  @Autowired
  private PedidoRepository pedidoRepository;

  @GetMapping("/pedidos")
  public ResponseEntity<List<Pedido>> obterTodosPedidos() {
    List<Pedido> lista = pedidoRepository.findAll();
    return ResponseEntity.ok(lista);
  }

  @GetMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> obterPedidoPorId(@PathVariable("id") String id) {
    Optional<Pedido> op = pedidoRepository.findById(Long.valueOf(id));
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/pedidos")
  public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {
    if (pedido.getPecaRoupaQnt() != null) {
      for (PecaRoupaQnt pecaRoupaQnt : pedido.getPecaRoupaQnt()) {
        pecaRoupaQnt.setPedido(pedido);
      }
    }

    Pedido novoPedido = pedidoRepository.save(pedido);
    return ResponseEntity.status(HttpStatus.CREATED).body(novoPedido);
  }
  // public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {
  // Optional<Pedido> op = pedidoRepository.findById(pedido.getIdPedido());
  // if (op.isPresent()) {
  // return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
  // } else {
  // pedido.setIdPedido(-1);
  // pedidoRepository.save(pedido);
  // return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
  // }
  // }

  // public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {
  // // Certifique-se de que cada PecaRoupaQnt está associada ao Pedido
  // if (pedido.getPecaRoupaQnt() != null) {
  // for (PecaRoupaQnt pecaRoupaQnt : pedido.getPecaRoupaQnt()) {
  // pecaRoupaQnt.setPedido(pedido);
  // }
  // }

  // // Salva o pedido (o ID será gerado automaticamente)
  // Pedido novoPedido = pedidoRepository.save(pedido);
  // return ResponseEntity.status(HttpStatus.CREATED).body(novoPedido);
  // }

  @PutMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> alterarPedido(@PathVariable("id") long id, @RequestBody Pedido pedido) {
    Optional<Pedido> op = pedidoRepository.findById(Long.valueOf(id));
    if (op.isPresent()) {
      pedido.setIdPedido(id);
      pedidoRepository.save(pedido);
      return ResponseEntity.ok(pedido);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> removerPedido(@PathVariable("id") long id) {
    Optional<Pedido> op = pedidoRepository.findById(Long.valueOf(id));
    if (op.isPresent()) {
      pedidoRepository.delete(op.get());
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
