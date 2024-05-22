package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "RestriccionEdad")
public class RestriccionEdad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRestriccion;
    private String descripcion;
}
