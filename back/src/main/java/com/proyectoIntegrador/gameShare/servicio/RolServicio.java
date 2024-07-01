package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.dto.RolDTO;
import com.proyectoIntegrador.gameShare.entidad.Rol;
import com.proyectoIntegrador.gameShare.repositorio.RolRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RolServicio {
    @Autowired
    private RolRepositorio rolRepositorio;

    public List<RolDTO> buscartodosRoles() {
        return rolRepositorio.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public RolDTO buscarRolPorId(int id) {
        return rolRepositorio.findById(id).map(this::convertToDTO).orElse(null);
    }

    public RolDTO crearRol(RolDTO rolDTO) {
        Rol rol = new Rol();
        rol.setNombreRol(rolDTO.getNombreRol());
        return convertToDTO(rolRepositorio.save(rol));
    }

    public RolDTO actualizarRol(int id, RolDTO rolDTO) {
        return rolRepositorio.findById(id).map(rol -> {
            rol.setNombreRol(rolDTO.getNombreRol());
            return convertToDTO(rolRepositorio.save(rol));
        }).orElse(null);
    }

    public void borrarRol(int id) {
        rolRepositorio.deleteById(id);
    }

    private RolDTO convertToDTO(Rol rol) {
        RolDTO rolDTO = new RolDTO();
        rolDTO.setIdRol(rol.getIdRol());
        rolDTO.setNombreRol(rol.getNombreRol());
        return rolDTO;
    }

}
