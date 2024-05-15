package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.entidad.Imagen;
import com.proyectoIntegrador.gameShare.repositorio.ImagenRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/imagenes")
public class ImagenControlador {

    @Autowired
    private ImagenRepositorio imagenRepositorio;

    @PostMapping("/subir") //Recibe la imagen como un archivo multipart y la guarda en la base de datos.
    public ResponseEntity<Imagen> subirImagen(@RequestParam("imagen")MultipartFile file) throws IOException {
        Imagen imagen = new Imagen();
        imagen.setNombre(file.getOriginalFilename());
        imagen.setData(file.getBytes());

        Imagen savedImagen = imagenRepositorio.save(imagen);
        return ResponseEntity.ok(savedImagen);
    }

    @GetMapping("/{id}")
    //obtenerImagen= Recupera una imagen por su ID y la devuelve como respuesta HTTP con el tipo de contenido adecuado
    public ResponseEntity<byte[]> getImagen(@PathVariable Long id) {
        Imagen imagen = imagenRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada"));
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(imagen.getNombre().split("\\.")[1]))
                .body(imagen.getData());
    }
}



