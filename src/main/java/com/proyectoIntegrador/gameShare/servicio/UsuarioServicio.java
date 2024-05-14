package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UsuarioServicio {
    @Autowired
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
