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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.lol_lavanderia.crud.model.Roupa;

@CrossOrigin
@RestController
public class RoupaREST {

  // Por enquanto, simula um "banco de dados"
  public static List<Roupa> lista = new ArrayList<>();

  @GetMapping("/roupas")
  public List<Roupa> obterTodasRoupas() {
    return lista;
  }

  @GetMapping("/roupas/{id}")
  public ResponseEntity<Roupa> obterRoupaPorId(
      @PathVariable("id") int id) {
    Roupa u = lista.stream().filter(
        usu -> usu.getRoupaId() == id).findAny().orElse(null);
    if (u == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .build();
    else
      return ResponseEntity.ok(u);
  }

  @PostMapping("/roupas")
  public ResponseEntity<Roupa> inserir(@RequestBody Roupa roupa) {
    Roupa u = lista.stream().filter(usu -> usu.getNome().equals(roupa.getNome())).findAny().orElse(null);
    if (u != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    u = lista.stream().max(Comparator.comparing(Roupa::getRoupaId)).orElse(null);
    if (u == null) {
      roupa.setRoupaId(1);
    } else {
      roupa.setRoupaId(u.getRoupaId() + 1);
    }
    lista.add(roupa);
    return ResponseEntity.status(HttpStatus.CREATED).body(roupa);
  }

  @PutMapping("/roupas/{id}")
  public ResponseEntity<Roupa> alterar(@PathVariable("id") int id, @RequestBody Roupa roupa) {
    Roupa u = lista.stream().filter(usu -> usu.getRoupaId() == id).findAny().orElse(null);

    if (u != null) {
      u.setNome(roupa.getNome());
      u.setValor(roupa.getValor());
      u.setPrazo(roupa.getPrazo());
      return ResponseEntity.ok(u);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  static {
    lista.add(new Roupa(1, "Calça", 4.0, 2));
    lista.add(new Roupa(2, "Camisa", 3.0, 2));
    lista.add(new Roupa(3, "Camiseta", 4.0, 3));
  }

}
