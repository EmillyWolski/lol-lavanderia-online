package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
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

import br.net.lol_lavanderia.crud.model.Funcionario;

@CrossOrigin
@RestController
public class FuncionarioREST {
  public static List<Funcionario> funcionarios = new ArrayList<>();

  static {
    funcionarios.add(new Funcionario(1, "julio", "julioyamaguchi99@gmail.com", "xxxxx", "20/12/1999"));
  }

  @GetMapping("/funcionarios")
  public ResponseEntity<List<Funcionario>> obterTodosFuncionarios() {
    return ResponseEntity.ok(funcionarios);
  }

  @GetMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> obterFuncionarioPorId(
      @PathVariable("id") long id) {
    Funcionario f = funcionarios.stream().filter(
        func -> func.getId() == id).findAny().orElse(null);
    if (f == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .build();
    else
      return ResponseEntity.ok(f);
  }

  @PostMapping("/funcionarios")
  public ResponseEntity<Funcionario> inserirFuncionario(@RequestBody Funcionario funcionario) {
    Funcionario f = funcionarios.stream().filter(func -> func.getEmail().equals(funcionario.getEmail())).findAny()
        .orElse(null);
    if (f != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    } else {
      funcionarios.add(funcionario);
      return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
    }
  }

  @PutMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> alterarFuncionario(@PathVariable("id") long id,
      @RequestBody Funcionario funcionario) {
    Funcionario f = funcionarios.stream().filter(func -> func.getId() == id).findAny().orElse(null);

    if (f != null) {
      f.setNome(funcionario.getNome());
      f.setEmail(funcionario.getEmail());
      f.setDataNascimento(funcionario.getDataNascimento());
      f.setSenha(funcionario.getSenha());
      return ResponseEntity.ok(f);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> removerFuncionario(@PathVariable("id") int id) {
    Funcionario f = funcionarios.stream().filter(func -> func.getId() == id)
        .findAny().orElse(null);
    if (f != null) {
      funcionarios.removeIf(p -> p.getId() == id);
      return ResponseEntity.ok(f);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
