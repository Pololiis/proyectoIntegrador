package com.proyectoIntegrador.gameShare.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AlquilerDTO {

    private Long id;
    private Date fechaReserva;
    private int duracionAlquiler;
    private Long usuariosId;
    private Long videojuegosId;
}
