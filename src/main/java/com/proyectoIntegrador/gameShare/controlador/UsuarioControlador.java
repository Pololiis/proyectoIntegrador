package com.proyectoIntegrador.gameShare.controlador;


import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.servicio.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.OptionalInt;

@RestController
@RequestMapping("/usuario")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @GetMapping("/id")
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
    @PostMapping
    public  ResponseEntity<Usuario> registrarUsuario(@Valid  @RequestBody Usuario usuario){

        Optional<Usuario> usuarioBuscado = usuarioServicio.buscarUsuarioPorID(usuario.getId());
        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(usuarioServicio.registrarUsuario(usuario));
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