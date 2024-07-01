package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Caracteristica;

import com.proyectoIntegrador.gameShare.repositorio.CaracteristicaRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class CaracteristicaServicio {
    private CaracteristicaRepositorio carateristsicaRepositorio;

    public List<Caracteristica> buscarTodasLasCaracteristicas() { return carateristsicaRepositorio.findAll();}

}