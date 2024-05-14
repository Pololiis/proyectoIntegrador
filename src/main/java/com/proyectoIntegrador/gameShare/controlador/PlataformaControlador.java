package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.entidad.Plataforma;
import com.proyectoIntegrador.gameShare.servicio.PlataformaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plataformas")
public class PlataformaControlador {
    @Autowired
    private PlataformaServicio plataformaService;

    @GetMapping
    public List<Plataforma> buscarTodaPlataformas() {
        return plataformaService.buscarTodaPlataformas();
    }

    @GetMapping("/{id}")
    public Plataforma buscarPlataformaPorId(@PathVariable Long id) {
        return plataformaService.buscarPlataformaPorId(id);
    }

    @PostMapping
    public Plataforma guardarPlataforma(@RequestBody Plataforma plataforma) {
        return plataformaService.guardarPlataforma(plataforma);
    }

    @DeleteMapping("/{id}")
    public void borrarPlataforma(@PathVariable Long id) {
        plataformaService.borrarPlataforma(id);
    }
}
