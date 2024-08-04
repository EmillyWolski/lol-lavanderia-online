package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.net.lol_lavanderia.crud.model.Pedido;

@CrossOrigin
@RestController
@RequestMapping("/pedidos")
public class PedidoREST {

    private static List<Pedido> pedidos = new ArrayList<>();

    @GetMapping
    public ResponseEntity<List<Pedido>> obterTodosPedidos() {
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obterPedidoPorId(@PathVariable("id") long id) {
        Pedido pedido = pedidos.stream().filter(p -> p.getIdPedido() == id).findFirst().orElse(null);
        if (pedido == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(pedido);
    }

    @PostMapping
    public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {
        if (pedido == null || pedido.getPecaRoupaQnt() == null || pedido.getPecaRoupaQnt().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retorna erro se pedido for nulo ou sem peças
        }
        // Geração do ID do pedido (pode ser substituído por um gerador de ID mais robusto)
        pedido.setIdPedido(System.currentTimeMillis()); // Ou qualquer outro método para gerar IDs únicos
        pedidos.add(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> alterarPedido(@PathVariable("id") long id, @RequestBody Pedido pedido) {
        Pedido p = pedidos.stream().filter(ped -> ped.getIdPedido() == id).findFirst().orElse(null);
        if (p == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        // Atualiza os campos do pedido
        p.setUsuario(pedido.getUsuario());
        p.setStatus(pedido.getStatus());
        p.setValorTotal(pedido.getValorTotal());
        p.setPrazo(pedido.getPrazo());
        p.setPecaRoupaQnt(pedido.getPecaRoupaQnt());
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Pedido> removerPedido(@PathVariable("id") long id) {
        Pedido pedido = pedidos.stream().filter(p -> p.getIdPedido() == id).findFirst().orElse(null);
        if (pedido == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        pedidos.removeIf(p -> p.getIdPedido() == id);
        return ResponseEntity.ok(pedido);
    }
}
