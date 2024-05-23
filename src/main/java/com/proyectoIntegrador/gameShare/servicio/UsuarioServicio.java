package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.repositorio.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class UsuarioServicio {
    private UsuarioRepositorio usuarioRepositorio;

    public Optional<Usuario> buscarUsuarioPorID(Long id){
        return usuarioRepositorio.findById(id);
    }
    public Optional<Usuario> buscarUsuarioPorEmail(String email){
        return usuarioRepositorio.findByEmail(email);
    }

    public Usuario registrarUsuario(Usuario usuario) { return usuarioRepositorio.save(usuario);}
    public void eliminarUsuario(Long id) { usuarioRepositorio.deleteById(id);}

    public void actualizarUsuario(Usuario usuario) { usuarioRepositorio.save(usuario);}
}
