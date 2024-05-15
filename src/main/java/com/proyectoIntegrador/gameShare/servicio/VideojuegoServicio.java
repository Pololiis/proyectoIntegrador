package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.repositorio.VideojuegoRepositorio;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class VideojuegoServicio {
    private final VideojuegoRepositorio videojuegoRepositorio;

    public Videojuego registrarVideojuego(Videojuego videojuego) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsByNombre(videojuego.getNombre());

        if(!videojuegoExiste) {

            return videojuegoRepositorio.save(videojuego);
        }

        return null;
    }

    public Videojuego buscarVideojuegoPorId(Long id) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsById(id);

        if(videojuegoExiste) {
            return videojuegoRepositorio.findById(id).get();
        }

        return null;
    }

    public List<Videojuego> listarVideojuegos() {
        return videojuegoRepositorio.findAll();
    }

    public Videojuego actualizarVideojuego(Long id, Videojuego videojuego) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsById(id);

        if(videojuegoExiste) {
            Videojuego videojuegoParaActualizar = videojuegoRepositorio.findById(id).get();

            videojuegoParaActualizar.setNombre(videojuego.getNombre());
            videojuegoParaActualizar.setDescripcion(videojuego.getDescripcion());
            videojuegoParaActualizar.setImagenes(videojuego.getImagenes());
            videojuegoParaActualizar.setCategoria(videojuego.getCategoria());
            videojuegoParaActualizar.setPlataforma(videojuego.getPlataforma());
            videojuegoParaActualizar.setRestriccionEdad(videojuego.getRestriccionEdad());

            return videojuegoRepositorio.save(videojuegoParaActualizar);
        }

        return null;
    }

    public String eliminarVideojuego(Long id) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsById(id);

        if(videojuegoExiste) {
            videojuegoRepositorio.deleteById(id);
            return "Videojuego con ID #" + id + " eliminado con éxito.";
        }
        throw new EntityNotFoundException("Videojuego con ID #" + id + " no encontrado.");
    }
}
