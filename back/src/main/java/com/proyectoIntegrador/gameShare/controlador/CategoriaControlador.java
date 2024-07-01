package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.CategoriaDTO;
import com.proyectoIntegrador.gameShare.entidad.Categoria;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.servicio.CategoriaServicio;
import com.proyectoIntegrador.gameShare.servicio.S3Servicio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/categorias")
@CrossOrigin("*")
@AllArgsConstructor
public class CategoriaControlador {
    private CategoriaServicio categoriaServicio;
    private final S3Servicio s3Servicio;
    @PostMapping(path = "/nuevo", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> registrarCategoria(@RequestParam("nombre") @Valid String nombre,
                                        @RequestParam("descripcion") @Valid String descripcion,
                                        @RequestParam("imagen") @Valid MultipartFile imagen)
            throws IOException {

        CategoriaDTO categoria = new CategoriaDTO();
        categoria.setNombre(nombre);
        categoria.setDescripcion(descripcion);

        if (imagen != null && !imagen.isEmpty()) {
            String nombreImagen = imagen.getOriginalFilename();

            if (nombreImagen.contains("..")) {
                return ResponseEntity.badRequest().body("Nombre de archivo no válido.");
            }

            try {
                s3Servicio.subirImagen(nombreImagen, imagen);
                String imagenUri = s3Servicio.construirUriImagen(nombreImagen);

                categoria.setImagen(imagenUri);

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen: " + e.getMessage());
            }
        }

        Categoria registroDeCategoria = categoriaServicio.registrarCategoria(categoria);

        if(registroDeCategoria != null) {
            return new ResponseEntity(registroDeCategoria, HttpStatus.CREATED);
        }

        return new ResponseEntity<>("La categoría ya existe en la base de datos.", HttpStatus.CONFLICT);
    }

    @GetMapping
    public List<Categoria> buscarTodaCategorias(){
        return categoriaServicio.buscarTodasCategorias();
    }

    @GetMapping("/{id}")
    public Categoria buscarCategoriaPorId(@PathVariable Long id) {
        return categoriaServicio.buscarCategoriaPorId(id);
    }

    @DeleteMapping("/{id}")
    public void borrarCategoria(@PathVariable Long id) {
        categoriaServicio.borrarCategoria(id);
    }

}
