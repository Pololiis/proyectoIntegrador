package com.proyectoIntegrador.gameShare.iniciador;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Component
public class AdminIniciador implements CommandLineRunner {
    @Autowired
    private PasswordEncoder encriptarContrasenia;
    @Autowired
    private DataSource dataSource;
    @Override
    public void run(String... args) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            String hashedPassword = encriptarContrasenia.encode("Hola123$");
            String sql = "INSERT INTO usuarios (nombre, apellido, email, contrasenia, roles_id_rol) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, "admin");
                statement.setString(2, "admin");
                statement.setString(3, "admin@admin.cl");
                statement.setString(4, hashedPassword);
                statement.setInt(5, 2);
                statement.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
