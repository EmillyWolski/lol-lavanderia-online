package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.Comparator;
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

import br.net.lol_lavanderia.crud.model.Roupa;
import br.net.lol_lavanderia.crud.repository.RoupaRepository;

@CrossOrigin
@RestController
public class RoupaREST {

  @Autowired
  private RoupaRepository roupaRepository;

  @GetMapping("/roupas")
  public ResponseEntity<List<Roupa>> obterTodasRoupas() {
    List<Roupa> lista = roupaRepository.findAll();
    return ResponseEntity.ok(lista);
  }

  @GetMapping("/roupas/{id}")
  public ResponseEntity<Roupa> obterRoupaPorId(@PathVariable("id") int id) {
    Optional<Roupa> op = roupaRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/roupas")
  public ResponseEntity<Roupa> inserir(@RequestBody Roupa roupa) {
    // Verifica se já existe uma roupa com o mesmo nome
    Optional<Roupa> op = roupaRepository.findByNome(roupa.getNome());

    if (op.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
    } else {
      roupa.setId(-1);
      roupaRepository.save(roupa);
      return ResponseEntity.status(HttpStatus.CREATED).body(roupa);
    }
  }

  @PutMapping("/roupas/{id}")
  public ResponseEntity<Roupa> alterar(@PathVariable("id") int id, @RequestBody Roupa roupa) {
    System.out.println("ID recebido para alterar roupa: " + id);
    Optional<Roupa> op = roupaRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      roupa.setId(id);
      roupaRepository.save(roupa);
      return ResponseEntity.ok(roupa);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/roupas/{id}")
  public ResponseEntity<Roupa> removerRoupa(@PathVariable("id") int id) {
    Optional<Roupa> op = roupaRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      roupaRepository.delete(op.get());
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
