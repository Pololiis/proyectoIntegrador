package com.proyectoIntegrador.gameShare.controlador;


import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.servicio.UsuarioServicio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
@AllArgsConstructor
@CrossOrigin("*")
public class UsuarioControlador {
    private UsuarioServicio usuarioServicio;

    @PostMapping("/nuevo")
    public  ResponseEntity<Object> registrarUsuario(@Valid @RequestBody Usuario usuario, BindingResult resultadoValidacion) {
        if(resultadoValidacion.hasErrors()) {
            List<String> errores = resultadoValidacion.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errores);
        }

        Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorEmail(usuario.getEmail());

        if (usuarioBuscado.isPresent()) {
            return new ResponseEntity<>("El usuario ya existe en la base de datos.", HttpStatus.CONFLICT);
        } else {
            return ResponseEntity.ok(usuarioServicio.registrarUsuario(usuario));
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

    @GetMapping("/buscar/{email}")
    public ResponseEntity<Usuario> buscarUsuarioPorEmail(@PathVariable String email) {
        Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorEmail(email);
        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.ok(usuarioBuscado.get());
        }else{
                return ResponseEntity.notFound().build();
            }

    }
           @PutMapping
           public ResponseEntity<String> actualizarUsuario(@RequestBody Usuario usuario){
                 Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorID(usuario.getId());
                             if(usuarioBuscado.isPresent()){
                                 usuarioServicio.actualizarUsuario(usuario);
                                 return ResponseEntity.ok("Usuario actualizado correctamente");
                             }                                                                      else{
                                 return ResponseEntity.badRequest().body("Usuario no encontrado")  ;
                             }
           }
      @DeleteMapping("{id}")
    public ResponseEntity<String> eliminarUsario(@PathVariable Long id){
          Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorID(id)     ;
                  if(usuarioBuscado.isPresent()) {
                      usuarioServicio.eliminarUsuario(id);
                      return ResponseEntity.ok("Usuario eliminado con éxito");
                  }else{
                      return ResponseEntity.badRequest().body("No se pudo eliminar con éxito")         ;
                  }
      }



}