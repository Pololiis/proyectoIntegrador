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
    private PlataformaServicio plataformaServicio;

    @GetMapping
    public List<Plataforma> buscarTodaPlataformas() {

        return plataformaServicio.buscarTodaPlataformas();
    }

    @GetMapping("/{id}")
    public Plataforma buscarPlataformaPorId(@PathVariable Integer id) {

        return plataformaServicio.buscarPlataformaPorId(id);
    }

    @PostMapping
    public Plataforma guardarPlataforma(@RequestBody Plataforma plataforma) {
        return plataformaServicio.guardarPlataforma(plataforma);
    }

    @DeleteMapping("/{id}")
    public void borrarPlataforma(@PathVariable Integer id) {
        plataformaServicio.borrarPlataforma(id);
    }
}
