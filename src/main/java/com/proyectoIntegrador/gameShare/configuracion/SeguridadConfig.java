package com.proyectoIntegrador.gameShare.configuracion;

import com.proyectoIntegrador.gameShare.seguridad.JwtAutenticacionDeEntrada;
import com.proyectoIntegrador.gameShare.seguridad.JwtFiltroDeAutenticacion;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

// Clase que contiene la configuración relacionada con la seguridad.
@Configuration
@EnableWebSecurity // Indica que se active la seguridad web en la app.
@AllArgsConstructor
@CrossOrigin("*")
public class SeguridadConfig {
    private JwtAutenticacionDeEntrada jwtAutenticacionDeEntrada;

    // Bean para verificar la información del usuario que va a loguearse.
    @Bean
    AuthenticationManager asistenteDeAutenticacion(AuthenticationConfiguration configuracionDeAutenticacion) throws Exception {
        return configuracionDeAutenticacion.getAuthenticationManager();
    }

    // Bean para encriptar contraseña.
    @Bean
    PasswordEncoder encriptarContrasenia() {
        return new BCryptPasswordEncoder();
    }

    // Bean para incorporar filtro de seguridad JWT desarrollado en la clase JwtFiltroDeAutenticacion.
    @Bean
    JwtFiltroDeAutenticacion jwtFiltroDeAutenticacion() {
        return new JwtFiltroDeAutenticacion();
    }

    // Bean para establecer una cadena de filtros de seguridad en la app. Aquí se determinan los permisos según rol del usuario.
    @Bean
    SecurityFilterChain filtrar(HttpSecurity peticion) throws Exception {
        peticion.csrf(csrf -> csrf.disable())
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(jwtAutenticacionDeEntrada)
                )
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers(HttpMethod.POST, "/videojuegos/nuevo").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/videojuegos/**" ).authenticated()
                        .requestMatchers(HttpMethod.GET, "/videojuegos/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/videojuegos/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/usuarios/nuevo").permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuarios/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/usuarios/**").hasAuthority("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PUT, "/usuarios/**").hasAuthority("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.POST, "/conectarse").permitAll()
                        .requestMatchers(HttpMethod.POST, "/registrarAdmin").permitAll()
                        .requestMatchers(HttpMethod.GET, "/caracteristicas/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/categorias/**" ).permitAll()
                        .requestMatchers(HttpMethod.POST, "/categorias/nuevo").authenticated()
                        .requestMatchers(HttpMethod.POST, "/alquiler/nuevo").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/alquiler/").authenticated()
                        .requestMatchers(HttpMethod.GET, "/alquiler/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/alquiler/**").hasAuthority("ADMINISTRADOR")
                        .anyRequest().authenticated()
                );
        peticion.addFilterBefore(jwtFiltroDeAutenticacion(), UsernamePasswordAuthenticationFilter.class);
        return peticion.build();
    }
}
