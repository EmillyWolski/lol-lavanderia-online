package br.net.lol_lavanderia.crud.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lol_lavanderia.crud.model.Roupa;

public interface RoupaRepository extends JpaRepository<Roupa, Integer> {
  public Optional<Roupa> findByNome(String nome);
}
