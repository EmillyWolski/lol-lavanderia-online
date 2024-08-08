package br.net.lol_lavanderia.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lol_lavanderia.crud.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
