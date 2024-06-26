package com.proyectoIntegrador.gameShare.dto;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class UsuarioRegistroDTO {
    @NotEmpty(message = "El campo nombre del usuario no puede estar vacío.")
    @NotNull(message = "El campo nombre del usuario no puede ser nulo.")
    @Size(min = 2, max = 90, message = "El campo nombre del usuario debe tener mínimo 2 caracteres y máximo 90 caracteres.")
    private String nombre;

    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo.")
    @Size(min = 2, max = 90, message = "El campo apellido del usuario debe tener mínimo 2 caracteres y máximo 90 caracteres.")
    private String apellido;

    @Column(unique = true)
    @NotEmpty(message = "El campo email del usuario no puede estar vacío.")
    @NotNull(message = "El campo email del usuario no puede ser nulo")
    @Pattern(regexp = "^[-\\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\\.){1,125}[A-Z]{2,63}$",
            message = "El formato del email es incorrecto.")
    private String email;

    /*
    @Column(name = "fecha_de_nacimiento")
    @NotEmpty(message = "El campo fecha de nacimiento del usuario no puede estar vacío.")
    @NotNull(message = "El campo fecha de nacimiento del usuario no puede ser nulo")
    private LocalDate fechaNacimiento;
*/
    @NotEmpty(message = "El campo contraseña del usuario no puede estar vacío.")
    @NotNull(message = "El campo contraseña del usuario no puede ser nulo")
    @Size(min = 8, max = 12, message = "El campo contraseña debe tener mínimo 8 caracteres y máximo 12 caracteres.")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
            message = "La contraseña debe contener al menos una letra mayúscula y un carácter especial.")
    private String contrasenia;
}
