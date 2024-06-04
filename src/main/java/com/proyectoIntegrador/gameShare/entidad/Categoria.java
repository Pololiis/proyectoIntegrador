package com.proyectoIntegrador.gameShare.entidad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.sql.Blob;
import java.util.List;

@Entity
@Data
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Column
    private String imagen;

    @OneToMany(mappedBy = "categoria")
    @JsonIgnore
    private List<Videojuego> videojuegos;
}
