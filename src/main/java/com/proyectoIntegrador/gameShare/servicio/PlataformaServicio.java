package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Plataforma;
import com.proyectoIntegrador.gameShare.repositorio.PlataformaRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class PlataformaServicio {

    private PlataformaRepositorio plataformaRepositorio;

    public List<Plataforma> buscarTodaPlataformas() {

        return plataformaRepositorio.findAll();
    }

    public Plataforma buscarPlataformaPorId(Integer id) {

        return plataformaRepositorio.findById(id).orElse(null);
    }

    public Plataforma guardarPlataforma(Plataforma plataforma) {

        return plataformaRepositorio.save(plataforma);
    }

    public void borrarPlataforma(Integer id) {

        plataformaRepositorio.deleteById(id);
    }

}
