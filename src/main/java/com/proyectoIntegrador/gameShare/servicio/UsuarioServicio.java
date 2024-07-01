package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.dto.UsuarioRegistroDTO;
import com.proyectoIntegrador.gameShare.entidad.Rol;
import com.proyectoIntegrador.gameShare.entidad.Usuario;
import com.proyectoIntegrador.gameShare.repositorio.RolRepositorio;
import com.proyectoIntegrador.gameShare.repositorio.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class UsuarioServicio {
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder encriptarContrasenia;
    private final RolRepositorio rolRepositorio;

    public Usuario registrarUsuario(UsuarioRegistroDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setContrasenia(encriptarContrasenia.encode(usuarioDTO.getContrasenia()));

        Rol rol = rolRepositorio.findByNombreRol("USUARIO").orElse(null);
        usuario.setRol(rol);

        return usuarioRepositorio.save(usuario);
    }

    public Usuario registrarUsuarioAdmin(UsuarioRegistroDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setContrasenia(encriptarContrasenia.encode(usuarioDTO.getContrasenia()));

        Rol rol = rolRepositorio.findByNombreRol("ADMINISTRADOR").orElse(null);
        usuario.setRol(rol);

        return usuarioRepositorio.save(usuario);
    }

    public Optional<Usuario> buscarUsuarioPorID(Long id) {
        return usuarioRepositorio.findById(id);
    }

    public Optional<Usuario> buscarUsuarioPorEmail(String email) {
        return usuarioRepositorio.findByEmail(email);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public Usuario actualizarUsuario(Long id, UsuarioRegistroDTO usuarioDTO) {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setContrasenia(encriptarContrasenia.encode(usuarioDTO.getContrasenia()));

        Rol rol = rolRepositorio.findByNombreRol("USUARIO").orElse(null);
        usuario.setRol(rol);

        return usuarioRepositorio.save(usuario);
    }

    public Usuario cambiarRolUsuario(Long id, String nuevoRol) {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Rol rol = rolRepositorio.findByNombreRol(nuevoRol)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        usuario.setRol(rol);

        return usuarioRepositorio.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepositorio.deleteById(id);
    }
}

