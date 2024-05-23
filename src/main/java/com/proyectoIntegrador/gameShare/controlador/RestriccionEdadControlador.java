package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.entidad.RestriccionEdad;
import com.proyectoIntegrador.gameShare.servicio.RestriccionEdadServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restricciones")
public class RestriccionEdadControlador {

    @Autowired
    private RestriccionEdadServicio restriccionEdadServicio;

    @GetMapping("/(id)")
    public RestriccionEdad buscarRestriccionPorId(@PathVariable Integer id) {
        return restriccionEdadServicio.buscarRestriccionPorId(id);
    }

    @PostMapping
    public RestriccionEdad guardarRestriccion(@RequestBody RestriccionEdad restriccion) {
        return  restriccionEdadServicio.guardarRestriccion(restriccion);
    }

    @DeleteMapping("/(id)")
    public void borrarRestriccion(@PathVariable Integer id) {
        restriccionEdadServicio.borrarRestriccion(id);
    }
}
