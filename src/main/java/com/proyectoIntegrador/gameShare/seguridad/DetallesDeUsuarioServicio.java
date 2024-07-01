package com.proyectoIntegrador.gameShare.seguridad;

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

@Service
@Transactional
@AllArgsConstructor
public class DetallesDeUsuarioServicio implements UserDetailsService {
    private UsuarioRepositorio usuarioRepositorio;

    // Método para mapear la autoridad del usuario
    private Collection<GrantedAuthority> mapearAutoridad(String rol) {
        return Collections.singletonList(new SimpleGrantedAuthority(rol));
    }

    // Método para cargar un usuario por su email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email no encontrado."));
        return new User(usuario.getEmail(), usuario.getContrasenia(), mapearAutoridad(usuario.getRol().getNombreRol()));
    }
}


