package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.lol_lavanderia.crud.model.Cliente;

@CrossOrigin
@RestController
public class ClienteREST {
  public static List<Cliente> clientes = new ArrayList<>();

  @GetMapping("/clientes")
  public ResponseEntity<List<Cliente>> obterTodosClientes() {
    return ResponseEntity.ok(clientes);
  }

  @GetMapping("/clientes/{id}")
  public ResponseEntity<Cliente> obterClientePorId(
      @PathVariable("id") int id) {
    Cliente c = clientes.stream().filter(
        cli -> cli.getId() == id).findAny().orElse(null);
    if (c == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .build();
    else
      return ResponseEntity.ok(c);
  }

  @PostMapping("/clientes")
  public ResponseEntity<Cliente> inserir(@RequestBody Cliente cliente) {
    Cliente c = clientes.stream().filter(cli -> cli.getEmail().equals(cliente.getEmail())).findAny().orElse(null);
    if (c != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    c = clientes.stream().max(Comparator.comparing(Cliente::getId)).orElse(null);
    if (c == null) {
      cliente.setId(1);
    } else {
      cliente.setId(c.getId() + 1);
    }
    clientes.add(cliente);
    return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
  }

}
