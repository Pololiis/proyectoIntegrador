package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.dto.VideojuegoDTO;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.repositorio.CategoriaRepositorio;
import com.proyectoIntegrador.gameShare.repositorio.VideojuegoRepositorio;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class VideojuegoServicio {
    private final VideojuegoRepositorio videojuegoRepositorio;
    private final CategoriaRepositorio categoriaRepositorio;

    public Videojuego registrarVideojuego(VideojuegoDTO videojuego) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsByNombre(videojuego.getNombre());

        if(!videojuegoExiste) {
            Videojuego videojuegoAGuardar = new Videojuego();
            videojuegoAGuardar.setNombre(videojuego.getNombre());
            videojuegoAGuardar.setDescripcion(videojuego.getDescripcion());
            videojuegoAGuardar.setCategoria(videojuego.getCategoria());
            videojuegoAGuardar.setCaracteristicas(videojuego.getCaracteristicas());
            List<String> imagenes = videojuego.getImagenes();
            videojuegoAGuardar.setImagenes(String.join(",", imagenes));

            return videojuegoRepositorio.save(videojuegoAGuardar);
        }

        return null;
    }

    public VideojuegoDTO buscarVideojuegoPorId(Long id) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsById(id);

        if(videojuegoExiste) {
            Videojuego videojuego = videojuegoRepositorio.findById(id).get();

            VideojuegoDTO videojuegoDTO = new VideojuegoDTO();
            videojuegoDTO.setId(videojuego.getId());
            videojuegoDTO.setNombre(videojuego.getNombre());
            videojuegoDTO.setDescripcion(videojuego.getDescripcion());
            videojuegoDTO.setCategoria((categoriaRepositorio.findById(videojuego.getCategoria().getId())).orElse(null));
            videojuegoDTO.setCaracteristicas(videojuego.getCaracteristicas());

            String stringImagenes = videojuego.getImagenes();
            List<String> listaImagenes = List.of(stringImagenes.split(","));

            videojuegoDTO.setImagenes(listaImagenes);

            return videojuegoDTO;
        }

        return null;
    }

    public List<VideojuegoDTO> listarVideojuegos() {
        List<Videojuego> videojuegos = videojuegoRepositorio.findAll();
        List<VideojuegoDTO> videojuegosDTO = new ArrayList<>();

        for (Videojuego videojuego : videojuegos) {
            VideojuegoDTO videojuegoDTO = new VideojuegoDTO();
            videojuegoDTO.setId(videojuego.getId());
            videojuegoDTO.setNombre(videojuego.getNombre());
            videojuegoDTO.setDescripcion(videojuego.getDescripcion());
            videojuegoDTO.setCategoria((categoriaRepositorio.findById(videojuego.getCategoria().getId())).orElse(null));
            videojuegoDTO.setCaracteristicas(videojuego.getCaracteristicas());

            String stringImagenes = videojuego.getImagenes();
            List<String> listaImagenes = List.of(stringImagenes.split(","));

            videojuegoDTO.setImagenes(listaImagenes);
            videojuegosDTO.add(videojuegoDTO);
        }
        return videojuegosDTO;
    }

    public Videojuego actualizarVideojuego(Long id, VideojuegoDTO videojuego) {
        Boolean videojuegoExiste = videojuegoRepositorio.existsById(id);

        if(videojuegoExiste) {
            Videojuego videojuegoParaActualizar = videojuegoRepositorio.findById(id).get();

            videojuegoParaActualizar.setNombre(videojuego.getNombre());
            videojuegoParaActualizar.setDescripcion(videojuego.getDescripcion());
            videojuegoParaActualizar.setCategoria(videojuego.getCategoria());
            videojuegoParaActualizar.setCaracteristicas(videojuego.getCaracteristicas());

            List<String> imagenes = videojuego.getImagenes();
            videojuegoParaActualizar.setImagenes(String.join(",", imagenes));

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
