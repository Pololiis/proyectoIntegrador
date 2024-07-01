package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.AlquilerDTO;
import com.proyectoIntegrador.gameShare.servicio.AlquilerServicio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alquiler")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AlquilerControlador {

    @Autowired
    private AlquilerServicio alquilerServicio;

    @GetMapping
    public List<AlquilerDTO> buscarTodosAlquileres() {
        return alquilerServicio.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlquilerDTO> buscarAlquilerPorId(@PathVariable Long id) {
        AlquilerDTO alquilerDTO = alquilerServicio.findById(id);
        if (alquilerDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(alquilerDTO);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<AlquilerDTO>> listarReservas(@PathVariable Long usuarioId) {
        List<AlquilerDTO> alquileres = alquilerServicio.findByUsuarioId(usuarioId);
        if (alquileres == null || alquileres.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(alquileres);
    }

    @PostMapping("/nuevo")
    public AlquilerDTO crearAlquiler(@RequestBody AlquilerDTO alquilerDTO) {
        return alquilerServicio.save(alquilerDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlquilerDTO> actualizarAlquiler(@PathVariable Long id, @RequestBody AlquilerDTO alquilerDTO) {
        AlquilerDTO actualizarAlquiler = alquilerServicio.save(alquilerDTO);
        if (actualizarAlquiler == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizarAlquiler);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlquiler(@PathVariable Long id) {
        alquilerServicio.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
