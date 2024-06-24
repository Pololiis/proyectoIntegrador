package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "alquiler")
public class Alquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_inicio")
    private Date fechaInicio;

    @Column(name = "fecha_fin")
    private Date fechaFin;

    @ManyToOne
    @JoinColumn(name = "usuarios_id", nullable = false) // Revisar el nombre de la columna en la BD
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "Videojuegos_id", nullable = false) // Revisar el nombre de la columna en la BD
    private Videojuego videojuego;



}
