package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.dto.AlquilerDTO;
import com.proyectoIntegrador.gameShare.entidad.Alquiler;
import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.repositorio.AlquilerRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AlquilerServicio {

    @Autowired
    private AlquilerRepositorio alquilerRepositorio;

    public List<AlquilerDTO> findAll() {
        List<Alquiler> alquileres = alquilerRepositorio.findAll();
        return alquileres.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public AlquilerDTO findById(Long id) {
        Optional<Alquiler> alquiler = alquilerRepositorio.findById(id);
        return alquiler.map(this::convertToDto).orElse(null);
    }

    public AlquilerDTO save(AlquilerDTO alquilerDTO) {
        Alquiler alquiler = convertToEntity(alquilerDTO);
        Alquiler savedAlquiler = alquilerRepositorio.save(alquiler);
        return convertToDto(savedAlquiler);
    }

    public void deleteById(Long id) {
        alquilerRepositorio.deleteById(id);
    }

    private AlquilerDTO convertToDto(Alquiler alquiler) {
        AlquilerDTO alquilerDTO = new AlquilerDTO();
        alquilerDTO.setId(alquiler.getId());
        alquilerDTO.setFechaInicio(alquiler.getFechaInicio());
        alquilerDTO.setFechaFin(alquiler.getFechaFin());
        alquilerDTO.setUsuariosId(alquiler.getUsuario().getId());
        alquilerDTO.setVideojuegosId(alquiler.getVideojuego().getId());
        alquilerDTO.setTexto(alquiler.getTexto());
        return alquilerDTO;
    }

    private Alquiler convertToEntity(AlquilerDTO alquilerDTO) {
        Alquiler alquiler = new Alquiler();
        alquiler.setId(alquilerDTO.getId());
        alquiler.setFechaInicio(alquilerDTO.getFechaInicio());
        alquiler.setFechaFin(alquilerDTO.getFechaFin());
        alquiler.setTexto(alquilerDTO.getTexto());
        
        // Aquí obtener los objetos Usuario y Videojuego por ID
        Usuario usuario = new Usuario();
        usuario.setId(alquilerDTO.getUsuariosId());
        alquiler.setUsuario(usuario);
        Videojuego videojuego = new Videojuego();
        videojuego.setId(alquilerDTO.getVideojuegosId());
        alquiler.setVideojuego(videojuego);
        return alquiler;
    }
}
