package com.proyectoIntegrador.gameShare.repositorio;

import com.proyectoIntegrador.gameShare.entidad.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepositorio extends JpaRepository<Categoria, Long> {
}