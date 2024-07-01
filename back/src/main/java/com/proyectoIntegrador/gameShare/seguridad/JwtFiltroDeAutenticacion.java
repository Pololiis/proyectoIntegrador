package com.proyectoIntegrador.gameShare.seguridad;

import com.proyectoIntegrador.gameShare.seguridad.DetallesDeUsuarioServicio;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// Valida la info del token y, de ser exitoso, establece la autenticación del usuario.
@Data
public class JwtFiltroDeAutenticacion extends OncePerRequestFilter {
    @Autowired
    private DetallesDeUsuarioServicio detallesDeUsuarioServicio;

    @Autowired
    private JwtGenerador jwtGenerador;

    private String obtenerTokenDeSolicitud(HttpServletRequest solicitud) {
        String bearerToken = solicitud.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest solicitud,
                                    HttpServletResponse respuesta,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = obtenerTokenDeSolicitud(solicitud);

        if(StringUtils.hasText(token) && jwtGenerador.validarToken(token)) {
            String emailUsuario = jwtGenerador.obtenerEmailUsuario(token);
            UserDetails detallesDeUsuario = detallesDeUsuarioServicio.loadUserByUsername(emailUsuario);
            List<String> rolDeUsuario = detallesDeUsuario.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

            if(rolDeUsuario.contains("USUARIO") || rolDeUsuario.contains("ADMINISTRADOR")) {
                UsernamePasswordAuthenticationToken  tokenDeAutenticacion = new UsernamePasswordAuthenticationToken(detallesDeUsuario,
                        null, detallesDeUsuario.getAuthorities());

                tokenDeAutenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(solicitud));
                SecurityContextHolder.getContext().setAuthentication(tokenDeAutenticacion);
            }
        }
        filterChain.doFilter(solicitud, respuesta);
    }
}
