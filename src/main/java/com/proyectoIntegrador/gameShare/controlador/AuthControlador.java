package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.AuthRespuestaDTO;
import com.proyectoIntegrador.gameShare.dto.UsuarioLoginDTO;
import com.proyectoIntegrador.gameShare.dto.UsuarioRegistroDTO;
import com.proyectoIntegrador.gameShare.dto.UsuarioRespuestaDTO;
import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.seguridad.JwtGenerador;
import com.proyectoIntegrador.gameShare.servicio.UsuarioServicio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AuthControlador {
    private AuthenticationManager asistenteDeAutenticacion;
    private JwtGenerador jwtGenerador;
    private UsuarioServicio usuarioServicio;
    @Autowired
    public AuthControlador(AuthenticationManager asistenteDeAutenticacion, JwtGenerador jwtGenerador, UsuarioServicio usuarioServicio) {
        this.asistenteDeAutenticacion = asistenteDeAutenticacion;
        this.jwtGenerador = jwtGenerador;
        this.usuarioServicio = usuarioServicio;
    }

    @PostMapping(value = "/conectarse")
    public ResponseEntity<AuthRespuestaDTO> conectarse(@RequestBody UsuarioLoginDTO usuarioLogin) {
        Authentication auth = asistenteDeAutenticacion.authenticate(new UsernamePasswordAuthenticationToken(
                usuarioLogin.getEmail(),
                usuarioLogin.getContrasenia()
        ));
        SecurityContextHolder.getContext().setAuthentication(auth);

        Usuario usuarioBuscado = usuarioServicio.buscarUsuarioPorEmail(usuarioLogin.getEmail()).orElse(null);
        UsuarioRespuestaDTO usuarioRespuesta = new UsuarioRespuestaDTO();
        usuarioRespuesta.setId(usuarioBuscado.getId());
        usuarioRespuesta.setNombre(usuarioBuscado.getNombre());
        usuarioRespuesta.setApellido(usuarioBuscado.getApellido());
        usuarioRespuesta.setEmail(usuarioBuscado.getEmail());
        usuarioRespuesta.setEdad(usuarioBuscado.getEdad());
        usuarioRespuesta.setRol(usuarioBuscado.getRol());
        usuarioRespuesta.setListaDeJuegos(usuarioBuscado.getListaDeJuegos());

        String token = jwtGenerador.generarToken(auth);
        return new ResponseEntity<>( new AuthRespuestaDTO(token, usuarioRespuesta), HttpStatus.OK);
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
