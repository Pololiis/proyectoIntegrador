package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.servicio.VideojuegoServicio;
import lombok.AllArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/videojuegos")
@AllArgsConstructor
@CrossOrigin("*")
public class VideojuegoControlador {
    private final VideojuegoServicio videojuegoServicio;

    @PostMapping("/nuevo")
    public ResponseEntity<Object> registrarVideojuego(@Valid @RequestBody Videojuego videojuego, BindingResult resultadoValidacion) {
        if(resultadoValidacion.hasErrors()) {
            List<String> errores = resultadoValidacion.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errores);
        }

        Videojuego registroDeVideojuego = videojuegoServicio.registrarVideojuego(videojuego);

        if(registroDeVideojuego != null) {
            return new ResponseEntity(registroDeVideojuego, HttpStatus.CREATED);
        }

        return new ResponseEntity<>("El videojuego ya existe en la base de datos.", HttpStatus.CONFLICT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarVideojuegoPorId(@PathVariable Long id) {
        Videojuego videojuegoBuscado = videojuegoServicio.buscarVideojuegoPorId(id);

        if(videojuegoBuscado != null) {
            return ResponseEntity.ok(videojuegoBuscado);
        }

        return ResponseEntity.notFound().build();
    }
}
