package com.proyectoIntegrador.gameShare.seguridad;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtGenerador {

    // Método para crear el token por medio de la autenticación.
    public String generarToken(Authentication autenticacion) {
        String email = autenticacion.getName();
        Date horaActual = new Date();
        Date expiracionToken = new Date(horaActual.getTime() + ConstantesDeSeguridad.EXPIRACION_TOKEN_JWT);

        // Generamos el token.
        String token = Jwts.builder()
                .subject(email)
                .issuedAt(horaActual)
                .expiration(expiracionToken)
                .signWith(ConstantesDeSeguridad.FIRMA_JWT)
                .compact();

        return token;
    }

    // Método para extraer el email a partir de un token.
    public String obtenerEmailUsuario(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(generarKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }
    public SecretKey generarKey() {
        return Keys.hmacShaKeyFor(ConstantesDeSeguridad.stringKeyParser().getBytes());
    }

    // Método para validar token.
    public Boolean validarToken(String token) {
        try {

            Jwts.parser()
                    .verifyWith(generarKey())
                    .build()
                    .parseSignedClaims(token);
            return true;

        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("Token expirado o incorrecto.");
        }
    }
}
