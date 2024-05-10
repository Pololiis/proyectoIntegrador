package com.proyectoIntegrador.gameShare.repositorio;

import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideojuegoRepositorio extends JpaRepository<Videojuego, Long> {
    Boolean existsByName(String name);
}
