package com.proyectoIntegrador.gameShare.seguridad;

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

@Service
@Transactional
@AllArgsConstructor
public class DetallesDeUsuarioServicio implements UserDetailsService {
    private UsuarioRepositorio usuarioRepositorio;

    // Método para traer lista de autoridades basadas en el rol del usuario.
    public Collection<GrantedAuthority> mapearAutoridad(Rol rol) {
        return Collections.singletonList(new SimpleGrantedAuthority(rol.getNombre()));
    }

    // Método para traernos los datos del usuario por medio de su email.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow( () -> new UsernameNotFoundException("Email no encontrado."));
        return new User(usuario.getEmail(), usuario.getContrasenia(), mapearAutoridad(usuario.getRol()));
    }
}
