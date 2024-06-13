package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.dto.RolDTO;
import com.proyectoIntegrador.gameShare.servicio.RolServicio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/roles")
@CrossOrigin("*")
@AllArgsConstructor
public class RolControlador {

    @Autowired
    private RolServicio rolServicio;

    @GetMapping
    public List<RolDTO> buscartodosRoles() {
        return rolServicio.buscartodosRoles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolDTO> buscarRolPorId(@PathVariable Long id) {
        RolDTO rolDTO = rolServicio.buscarRolPorId(id);
        if(rolDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rolDTO);
    }

    @PostMapping("/nuevo")
    public RolDTO crearRol(@RequestBody RolDTO rolDTO) {
        return rolServicio.crearRol(rolDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolDTO> actualizarRol(@PathVariable Long id, @RequestBody RolDTO rolDTO) {
        RolDTO actualizarRolDTO = rolServicio.actualizarRol(id, rolDTO);
        if (actualizarRolDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizarRolDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrarRol(@PathVariable Long id) {
        rolServicio.borrarRol(id);
        return ResponseEntity.noContent().build();
    }
}
