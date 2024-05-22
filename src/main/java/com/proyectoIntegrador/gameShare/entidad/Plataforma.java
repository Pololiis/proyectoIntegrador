package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Plataformas")
public class Plataforma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPlataforma;

    @Column(nullable = false)
    private String nombrePlataforma;
}
