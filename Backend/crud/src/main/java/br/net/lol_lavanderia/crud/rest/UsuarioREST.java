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

import br.net.lol_lavanderia.crud.model.Login;
import br.net.lol_lavanderia.crud.model.Usuario;

@CrossOrigin
@RestController
public class UsuarioREST {
  public static List<Usuario> lista = new ArrayList<>();

  @GetMapping("/usuarios")
  public ResponseEntity<List<Usuario>> obterTodosUsuarios() {
    return ResponseEntity.ok(lista);
  }

  @GetMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> obterUsuarioPorId(
      @PathVariable("id") int id) {
    Usuario u = lista.stream().filter(
        usu -> usu.getId() == id).findAny().orElse(null);
    if (u == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .build();
    else
      return ResponseEntity.ok(u);
  }

  @PostMapping("/usuarios")
  public ResponseEntity<Usuario> inserirUsuario(@RequestBody Usuario usuario) {
    // Verifica se já existe um usuário com o mesmo email ou CPF
    Usuario u = lista.stream()
        .filter(usu -> usu.getEmail().equals(usuario.getEmail()) || usu.getCpf().equals(usuario.getCpf()))
        .findAny()
        .orElse(null);
    if (u != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    // Determina o ID do novo usuário
    u = lista.stream()
        .max(Comparator.comparing(Usuario::getId))
        .orElse(null);
    if (u == null) {
      usuario.setId(1);
    } else {
      usuario.setId(u.getId() + 1);
    }

    // Valida o email e define o perfil
    if (usuario.getEmail().contains("@lol_lavanderia")) {
      usuario.setPerfil("FUNCIONARIO");
    } else {
      usuario.setPerfil("CLIENTE");
    }

    // Adiciona o usuário à lista e retorna a resposta
    lista.add(usuario);
    return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
  }

  // Vai ser usado apenas quando tiver que alterar um funcionario
  @PutMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> alterarUsuario(
      @PathVariable("id") int id,
      @RequestBody Usuario usuario) {
    Usuario u = lista.stream().filter(
        usu -> usu.getId() == id).findAny().orElse(null);
    if (u != null) {
      u.setNome(usuario.getNome());
      u.setEmail(usuario.getEmail());
      u.setSenha(usuario.getSenha());
      u.setDataNascimento(usuario.getDataNascimento());
      return ResponseEntity.ok(u);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .build();
  }

  @DeleteMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> remover(@PathVariable("id") int id) {
    Usuario usuario = lista.stream()
        .filter(usu -> usu.getId() == id)
        .findAny()
        .orElse(null);
    if (usuario != null) {
      lista.removeIf(u -> u.getId() == id);
      return ResponseEntity.ok(usuario);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<Usuario> login(@RequestBody Login login) {
    Usuario usuario = lista.stream().filter(usu -> usu.getEmail().equals(login.getEmail()) &&
        usu.getSenha().equals(login.getSenha())).findAny().orElse(null);
    if (usuario == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .build();
    else
      return ResponseEntity.ok(usuario);
  }

}
