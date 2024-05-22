package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.Size;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "Videojuegos")
public class Videojuego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotEmpty(message = "El campo nombre del videojuego no puede estar vacío.")
    @NotNull(message = "El campo nombre del videojuego no puede ser nulo")
    @Size(min = 2, max = 450, message = "El campo nombre del videojuego debe tener mínimo 2 caracteres y máximo 450 caracteres.")
    private String nombre;

    @Lob
    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "El campo descripción del videojuego no puede estar vacío.")
    @NotNull(message = "El campo descripción del videojuego no puede ser nulo")
    @Size(min = 30, message = "El campo descripción del videojuego debe tener un mínimo de 30 caracteres.")
    private String descripcion;

    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "El campo imagen del videojuego no puede estar vacío.")
    @NotNull(message = "El campo imagen del videojuego no puede ser nulo")
    private String imagenes;

    private String categoria;

    private String plataforma;

    private String restriccionEdad;
}