package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.RestriccionEdad;
import com.proyectoIntegrador.gameShare.repositorio.RestriccionEdadRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestriccionEdadServicio {

    @Autowired
    private RestriccionEdadRepositorio restriccionEdadRepositorio;

    public List<RestriccionEdad> buscarRestricciones(){

        return restriccionEdadRepositorio.findAll();
    }

    public RestriccionEdad guardarRestriccion(RestriccionEdad restriccionEdad) {

        return restriccionEdadRepositorio.save(restriccionEdad);
    }

    public RestriccionEdad buscarRestriccionPorId(Integer id) {

        return restriccionEdadRepositorio.findById(id).orElse(null);
    }

    public void borrarRestriccion(Integer id) {
        restriccionEdadRepositorio.deleteById(id);
    }
}
