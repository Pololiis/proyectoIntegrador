package com.proyectoIntegrador.gameShare.dto;

import com.proyectoIntegrador.gameShare.entidad.Rol;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import lombok.Data;

import java.util.ArrayList;

@Data
public class UsuarioRespuestaDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private Integer edad;
    private Rol rol;
    private ArrayList<Videojuego> listaDeJuegos;
}
