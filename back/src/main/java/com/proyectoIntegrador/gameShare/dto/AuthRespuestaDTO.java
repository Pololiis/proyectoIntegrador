package com.proyectoIntegrador.gameShare.dto;

import com.proyectoIntegrador.gameShare.entidad.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

// Clase que devuelve la información del token y su tipo.
@Data
public class AuthRespuestaDTO {
    private String tokenDeAcceso;
    private String tipoDeToken = "Bearer ";
    private UsuarioRespuestaDTO usuario;

    public AuthRespuestaDTO(String tokenDeAcceso, UsuarioRespuestaDTO usuario) {
        this.tokenDeAcceso = tokenDeAcceso;
        this.usuario = usuario;
    }
}
