package com.proyectoIntegrador.gameShare.controlador;


import com.proyectoIntegrador.gameShare.dto.UsuarioRegistroDTO;
import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.servicio.UsuarioServicio;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@AllArgsConstructor
@CrossOrigin("*")
public class UsuarioControlador {
    private UsuarioServicio usuarioServicio;

    @PostMapping("/nuevo")
    public  ResponseEntity<Usuario> registrarUsuario(@Valid @RequestBody UsuarioRegistroDTO usuarioDTO){
        Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorEmail(usuarioDTO.getEmail());

        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuarioServicio.registrarUsuario(usuarioDTO));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorID(@PathVariable Long id) {
           Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorID(id);
           if(usuarioBuscado.isPresent())
               return ResponseEntity.ok(usuarioBuscado.get());
           else{
               return ResponseEntity.notFound().build();
           }
       
    }

    @GetMapping
    public ResponseEntity<Object> listarUsuarios() {
        return ResponseEntity.ok(usuarioServicio.listarUsuarios());
    }


    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioRegistroDTO usuarioDTO
    ) {
        Optional<Usuario> usuarioExistente = usuarioServicio.buscarUsuarioPorID(id);

        if (!usuarioExistente.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            Usuario usuarioActualizado = usuarioServicio.actualizarUsuario(id, usuarioDTO);
            return ResponseEntity.ok(usuarioActualizado);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsario(@PathVariable Long id){
          Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorID(id);
          if(usuarioBuscado.isPresent()) {
              usuarioServicio.eliminarUsuario(id);
              return ResponseEntity.ok("Usuario eliminado con éxito.");
          } else {
              return ResponseEntity.badRequest().body("El usuario no existe en la base de datos.");
          }
    }
}