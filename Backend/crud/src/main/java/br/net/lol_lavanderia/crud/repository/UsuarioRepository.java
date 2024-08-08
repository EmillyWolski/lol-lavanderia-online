package br.net.lol_lavanderia.crud.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lol_lavanderia.crud.model.Usuario;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
  public Optional<Usuario> findByEmail(String email);

  public Optional<Usuario> findByCpf(String cpf);

  public Optional<Usuario> findByEmailAndSenha(String email, String senha);

  public List<Usuario> findByPerfil(String perfil);
}
