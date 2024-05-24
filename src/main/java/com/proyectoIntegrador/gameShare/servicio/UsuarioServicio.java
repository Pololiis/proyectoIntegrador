package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Rol;
import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.repositorio.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class UsuarioServicio {
    private UsuarioRepositorio usuarioRepositorio;
    public Usuario registrarUsuario(Usuario usuario) { return usuarioRepositorio.save(usuario);}
    public Optional<Usuario> buscarUsuarioPorID(Long id){
        return usuarioRepositorio.findById(id);
    }
    public Optional<Usuario> buscarUsuarioPorEmail(String email){
        return usuarioRepositorio.findByEmail(email);
    }
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }
    public void actualizarUsuario(Usuario usuario) { usuarioRepositorio.save(usuario);}
    public void eliminarUsuario(Long id) { usuarioRepositorio.deleteById(id);}
}
