package com.proyectoIntegrador.gameShare.repositorio;

import com.proyectoIntegrador.gameShare.entidad.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepositorio extends JpaRepository<Caracteristica, Long> {
}
