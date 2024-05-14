package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Plataforma;
import com.proyectoIntegrador.gameShare.repositorio.PlataformaRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class PlataformaServicio {
    @Autowired
    private PlataformaRepositorio plataformaRepositorio;

    public List<Plataforma> buscarTodaPlataformas() {
        return plataformaRepositorio.findAll();
    }

    public Plataforma buscarPlataformaPorId(Long id) {
        return plataformaRepositorio.findById(id).orElse(null);
    }

    public Plataforma guardarPlataforma(Plataforma plataforma) {
        return plataformaRepositorio.save(plataforma);
    }

    public void borrarPlataforma(Long id) {
        plataformaRepositorio.deleteById(id);
    }

}
