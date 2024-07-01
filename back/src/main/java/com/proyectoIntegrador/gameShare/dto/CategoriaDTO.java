package com.proyectoIntegrador.gameShare.dto;

import jakarta.persistence.Column;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class CategoriaDTO {
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @NotNull
    @NotEmpty
    private String descripcion;

    @NotNull
    @NotEmpty
    private String imagen;
}
