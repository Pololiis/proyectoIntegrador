package com.proyectoIntegrador.gameShare.controlador;


import com.proyectoIntegrador.gameShare.entidad.Caracteristica;
import com.proyectoIntegrador.gameShare.servicio.CaracteristicaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/caracteristicas")
public class CaracteristicaControlador {
    @Autowired
    private CaracteristicaServicio caracteristicaServicio;

    @GetMapping("/listar")
    public List<Caracteristica> buscarTodasLasCaracteristicas(){
        return caracteristicaServicio.buscarTodasLasCaracteristicas();
    }
}