package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.VideojuegoDTO;
import com.proyectoIntegrador.gameShare.entidad.Caracteristica;
import com.proyectoIntegrador.gameShare.entidad.Categoria;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.servicio.S3Servicio;
import com.proyectoIntegrador.gameShare.servicio.VideojuegoServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/videojuegos")
@CrossOrigin("*")
@AllArgsConstructor
public class VideojuegoControlador {
    private final VideojuegoServicio videojuegoServicio;
    private final S3Servicio s3Servicio;

    @PostMapping(path = "/nuevo", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> registrarVideojuego(@RequestParam("imagen") List<@Valid MultipartFile> imagenes,
                                                      @RequestParam("nombre") @NotEmpty @Size(min = 2, max = 450) String nombre,
                                                      @Valid @RequestParam("descripcion") @NotEmpty @Size(min = 30) String descripcion,
                                                      @RequestParam("plataforma") Categoria categoria,
                                                      @RequestParam("caracteristicas") List<Caracteristica> caracteristicas)

            throws IOException {

        VideojuegoDTO videojuego = new VideojuegoDTO();
        videojuego.setNombre(nombre);
        videojuego.setDescripcion(descripcion);
        videojuego.setCategoria(categoria);
        videojuego.setCaracteristicas(caracteristicas);

        List<String> urisImagenes = new ArrayList<>();

        for (MultipartFile imagen : imagenes) {
            if (imagen != null && !imagen.isEmpty()) {
                String nombreImagen = imagen.getOriginalFilename();

                if (nombreImagen.contains("..")) {
                    return ResponseEntity.badRequest().body("Nombre de archivo no válido.");
                }

                try {
                    s3Servicio.subirImagen(nombreImagen, imagen);
                    String imagenUri = s3Servicio.construirUriImagen(nombreImagen);

                    urisImagenes.add(imagenUri);

                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen: " + e.getMessage());
                }
            }
        }

        videojuego.setImagenes(urisImagenes);

        Videojuego registroDeVideojuego = videojuegoServicio.registrarVideojuego(videojuego);

        if(registroDeVideojuego != null) {
            return new ResponseEntity(registroDeVideojuego, HttpStatus.CREATED);
        }

        return new ResponseEntity<>("El videojuego ya existe en la base de datos.", HttpStatus.CONFLICT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarVideojuegoPorId(@PathVariable Long id) {
        VideojuegoDTO videojuegoBuscado = videojuegoServicio.buscarVideojuegoPorId(id);

        if(videojuegoBuscado != null) {
            return ResponseEntity.ok(videojuegoBuscado);
        }

        return ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<Object> listarVideojuegos() {
        return ResponseEntity.ok(videojuegoServicio.listarVideojuegos());
    }

    @PutMapping(path = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> actualizarVideojuego(@RequestParam Long id,
                                                       @RequestParam("imagen") List<@Valid MultipartFile> imagenes,
                                                       @RequestParam("nombre") @NotEmpty @Size(min = 2, max = 450) String nombre,
                                                       @Valid @RequestParam("descripcion") @NotEmpty @Size(min = 30) String descripcion,
                                                       @RequestParam("plataforma") Categoria categoria,
                                                       @RequestParam("caracteristicas") List<Caracteristica> caracteristicas)
            throws IOException {

        VideojuegoDTO videojuego = videojuegoServicio.buscarVideojuegoPorId(id);
        videojuego.setNombre(nombre);
        videojuego.setDescripcion(descripcion);
        videojuego.setCategoria(categoria);
        videojuego.setCaracteristicas(caracteristicas);

        List<String> urisImagenes = new ArrayList<>();

        for (MultipartFile imagen : imagenes) {
            if (imagen != null && !imagen.isEmpty()) {
                String nombreImagen = imagen.getOriginalFilename();

                if (nombreImagen.contains("..")) {
                    return ResponseEntity.badRequest().body("Nombre de archivo no válido.");
                }

                try {
                    s3Servicio.subirImagen(nombreImagen, imagen);
                    String imagenUri = s3Servicio.construirUriImagen(nombreImagen);

                    urisImagenes.add(imagenUri);

                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen: " + e.getMessage());
                }
            }
        }

        videojuego.setImagenes(urisImagenes);

        Videojuego registroDeVideojuego = videojuegoServicio.actualizarVideojuego(id,videojuego);

        if(registroDeVideojuego != null) {
            return new ResponseEntity(registroDeVideojuego, HttpStatus.CREATED);
        }

        return new ResponseEntity<>("El videojuego no se encuentra en la base de datos.", HttpStatus.CONFLICT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarVideojuego(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(videojuegoServicio.eliminarVideojuego(id));
        } catch (EntityNotFoundException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
