package com.proyectoIntegrador.gameShare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// Clase que devuelve la información del token y su tipo.
@Data
public class AuthRespuestaDTO {
    private String tokenDeAcceso;
    private String tipoDeToken = "Bearer ";
    public AuthRespuestaDTO(String tokenDeAcceso) {
        this.tokenDeAcceso = tokenDeAcceso;
    }
}
