package com.proyectoIntegrador.gameShare.entidad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Blob;
import java.util.List;

@Entity
@Data
@Table(name = "caracteristicas")

public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    private String nombre;

    @NotNull
    @NotEmpty
    private String imagen;

    @ManyToMany(mappedBy = "caracteristicas")
    @JsonIgnore
    private List<Videojuego> videojuegos;
}
