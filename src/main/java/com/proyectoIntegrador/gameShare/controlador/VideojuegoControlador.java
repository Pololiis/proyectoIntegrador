package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.VideojuegoDTO;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.servicio.VideojuegoServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/videojuegos")
@CrossOrigin("*")
@AllArgsConstructor
public class VideojuegoControlador {
    private final VideojuegoServicio videojuegoServicio;
    private Environment env;

    @PostMapping("/nuevo")
    public ResponseEntity<Object> registrarVideojuego(@RequestParam("imagen") List<@Valid MultipartFile> imagenes,
                                                      @RequestParam("nombre") @NotEmpty @Size(min = 2, max = 450) String nombre,
                                                      @Valid @RequestParam("descripcion") @NotEmpty @Size(min = 30) String descripcion)
            throws IOException {

        VideojuegoDTO videojuego = new VideojuegoDTO();
        videojuego.setNombre(nombre);
        videojuego.setDescripcion(descripcion);
        String carpetaAlmacenamiento = env.getProperty("carpeta.de.imagenes");

        List<String> urisImagenes = new ArrayList<>();

        for (MultipartFile imagen : imagenes) {
            System.out.println(imagen);
            if (imagen != null && !imagen.isEmpty()) {
                String nombreImagen = StringUtils.cleanPath(imagen.getOriginalFilename());

                if (nombreImagen.contains("..")) {
                    return ResponseEntity.badRequest().body("Nombre de archivo no válido.");
                }

                try {
                    File currentDir = new File(".");
                    String projectPath = currentDir.getCanonicalPath();
                    Path directorioAlmacenamiento = Paths.get(projectPath, carpetaAlmacenamiento).toAbsolutePath().normalize();
                    Files.createDirectories(directorioAlmacenamiento);

                    Path rutaAlmacenamiento = directorioAlmacenamiento.resolve(nombreImagen).normalize();
                    Files.copy(imagen.getInputStream(), rutaAlmacenamiento, StandardCopyOption.REPLACE_EXISTING);
                    String uriImagen = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/images/")
                            .path(nombreImagen)
                            .toUriString();
                    urisImagenes.add(uriImagen);

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
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarVideojuego(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(videojuegoServicio.eliminarVideojuego(id));
        } catch (EntityNotFoundException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
