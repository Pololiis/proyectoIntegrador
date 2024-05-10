package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
    @Min(value = 2, message = "El campo nombre del videojuego debe tener un mínimo de 2 caracteres.")
    @Max(value = 450, message = "El campo nombre del videojuego debe tener un máximo de 450 caracteres.")
    private String nombre;

    @NotEmpty(message = "El campo descripción del videojuego no puede estar vacío.")
    @NotNull(message = "El campo descripción del videojuego no puede ser nulo")
    @Min(value = 30, message = "El campo descripción del videojuego debe tener un mínimo de 30 caracteres.")
    private String descripcion;

    @NotEmpty(message = "El campo imagen del videojuego no puede estar vacío.")
    @NotNull(message = "El campo imagen del videojuego no puede ser nulo")
    private String imagen;

    @NotEmpty(message = "El campo categoría del videojuego no puede estar vacío.")
    @NotNull(message = "El campo categoría del videojuego no puede ser nulo")
    private Categoria categoria;

    @NotEmpty(message = "El campo plataforma del videojuego no puede estar vacío.")
    @NotNull(message = "El campo plataforma del videojuego no puede ser nulo")
    private Plataforma plataforma;

    @Column(name = Restriccion_Edad)
    @NotEmpty(message = "El campo restricción del videojuego no puede estar vacío.")
    @NotNull(message = "El campo restricción del videojuego no puede ser nulo")
    private RestriccionEdad restriccionEdad;

}
