package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.AuthRespuestaDTO;
import com.proyectoIntegrador.gameShare.dto.UsuarioLoginDTO;
import com.proyectoIntegrador.gameShare.seguridad.JwtGenerador;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
@AllArgsConstructor
public class AuthControlador {
    private AuthenticationManager asistenteDeAutenticacion;
    private JwtGenerador jwtGenerador;

    @PostMapping(value = "/conectarse")
    public ResponseEntity<AuthRespuestaDTO> conectarse(@RequestBody UsuarioLoginDTO usuarioLogin) {
        Authentication auth = asistenteDeAutenticacion.authenticate(new UsernamePasswordAuthenticationToken(
                usuarioLogin.getEmail(),
                usuarioLogin.getContrasenia()
        ));
        SecurityContextHolder.getContext().setAuthentication(auth);

        String token = jwtGenerador.generarToken(auth);
        return new ResponseEntity<>( new AuthRespuestaDTO(token), HttpStatus.OK);
    }
}
