package br.net.lol_lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import br.net.lol_lavanderia.crud.model.Login;
import br.net.lol_lavanderia.crud.model.Usuario;
import br.net.lol_lavanderia.crud.repository.UsuarioRepository;

@CrossOrigin
@RestController
public class UsuarioREST {
  public static List<Usuario> lista = new ArrayList<>();

  @Autowired
  private UsuarioRepository usuarioRepository;

  @GetMapping("/usuarios")
  public ResponseEntity<List<Usuario>> obterTodosUsuarios() {
    List<Usuario> lista = usuarioRepository.findAll();
    return ResponseEntity.ok(lista);
  }

  @GetMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable("id") int id) {
    Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

  }

  @PostMapping("/usuarios")
  public ResponseEntity<Usuario> inserirUsuario(@RequestBody Usuario usuario) {

    // Verifica se já existe um usuário com o mesmo email ou CPF
    Optional<Usuario> op = usuarioRepository.findByEmail(usuario.getEmail());
    Optional<Usuario> op2 = usuarioRepository.findByCpf(usuario.getCpf());

    // Valida o email e define o perfil
    if (usuario.getEmail().contains("@lol_lavanderia")) {
      usuario.setPerfil("FUNCIONARIO");
    } else {
      usuario.setPerfil("CLIENTE");
    }

    if (op.isPresent() || op2.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
    } else {
      usuario.setId(-1);
      usuarioRepository.save(usuario);
      return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }
  }

  // Vai ser usado apenas quando tiver que alterar um funcionario
  @PutMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> alterarUsuario(@PathVariable("id") int id, @RequestBody Usuario usuario) {
    Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      usuario.setId(id);
      usuarioRepository.save(usuario);
      return ResponseEntity.ok(usuario);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> remover(@PathVariable("id") int id) {
    Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      usuarioRepository.delete(op.get());
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<Usuario> login(@RequestBody Login login) {
    Optional<Usuario> op = usuarioRepository.findByEmailAndSenha(login.getEmail(), login.getSenha());
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }

  @GetMapping("/usuarios/funcionarios")
  public ResponseEntity<List<Usuario>> listarFuncionarios() {
    List<Usuario> lista = usuarioRepository.findByPerfil("FUNCIONARIO");
    return ResponseEntity.ok(lista);
  }

  @GetMapping("/usuarios/clientes")
  public ResponseEntity<List<Usuario>> listarClientes() {
    List<Usuario> lista = usuarioRepository.findByPerfil("CLIENTE");
    return ResponseEntity.ok(lista);
  }

}
