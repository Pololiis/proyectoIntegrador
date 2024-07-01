package com.proyectoIntegrador.gameShare.repositorio;

import com.proyectoIntegrador.gameShare.entidad.Alquiler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlquilerRepositorio extends JpaRepository<Alquiler, Long> {
    List<Alquiler> findByUsuarioId(Long usuarioId);
}