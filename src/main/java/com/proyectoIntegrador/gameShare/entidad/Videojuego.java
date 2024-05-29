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
@Table(name = "videojuegos")
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

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "categoria_id" )
    private Categoria categoria;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)

    @JoinTable(name = "videojuego_caracteristica",
    joinColumns =  @JoinColumn(name="videojuego_id"), inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))

    private List<Caracteristica> caracteristicas;

    private String requisitos;

    private String restriccionEdad;
}