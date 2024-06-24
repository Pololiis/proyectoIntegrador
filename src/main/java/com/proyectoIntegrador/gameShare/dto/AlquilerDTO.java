package com.proyectoIntegrador.gameShare.dto;

import lombok.Data;

import java.util.Date;
@Data
public class AlquilerDTO {

    private Long id;
    private Date fechaInicio;
    private Date fechaFin;
    private Long usuariosId;
    private Long videojuegosId;

    //Getters y Setters


}
