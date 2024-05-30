package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.AuthRespuestaDTO;
import com.proyectoIntegrador.gameShare.dto.UsuarioLoginDTO;
import com.proyectoIntegrador.gameShare.dto.UsuarioRegistroDTO;
import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.seguridad.JwtGenerador;
import com.proyectoIntegrador.gameShare.servicio.UsuarioServicio;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
@AllArgsConstructor
public class AuthControlador {
    private AuthenticationManager asistenteDeAutenticacion;
    private JwtGenerador jwtGenerador;
    private UsuarioServicio usuarioServicio;

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
    @PostMapping("/registrarAdmin")
    public  ResponseEntity<Usuario> registrarUsuarioAdmin(@Valid @RequestBody UsuarioRegistroDTO usuarioDTO){
        Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorEmail(usuarioDTO.getEmail());

        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuarioServicio.registrarUsuarioAdmin(usuarioDTO));
        }
    }
}
