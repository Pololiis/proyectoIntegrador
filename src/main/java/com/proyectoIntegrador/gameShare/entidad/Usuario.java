package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Data
@Table(name = "Usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "El campo nombre del usuario no puede estar vacío.")
    @NotNull(message = "El campo nombre del usuario no puede ser nulo")
    @Min(value = 2, message = "El campo nombre del usuario debe tener un mínimo de 2 caracteres.")
    @Max(value = 90, message = "El campo nombre del usuario debe tener un máximo de 90 caracteres.")
    private String nombre;

    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo")
    @Min(value = 2, message = "El campo apellido del usuario debe tener un mínimo de 2 caracteres.")
    @Max(value = 90, message = "El campo apellido del usuario debe tener un máximo de 90 caracteres.")
    private String apellido;

    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo")
    @Min(value = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
            message = "La contraseña debe contener al menos una letra mayúscula y un carácter especial")
    private String contrasenia;

    @Column(unique = true)
    @NotEmpty(message = "El campo email del usuario no puede estar vacío.")
    @NotNull(message = "El campo email del usuario no puede ser nulo")
    @Email
    private String email;

    @Column(name = "fecha_de_nacimiento")
    @NotEmpty(message = "El campo fecha de nacimiento no puede estar vacío.")
    @NotNull(message = "El campo fecha de nacimiento no puede ser nulo")
    private LocalDate fechaNacimiento;

    private String rol;

    // private List listaDeJuegos;

    public Integer calcularEdad (LocalDate fechaNacimiento){
        LocalDate fechaActual = LocalDate.now();
        return Period.between(fechaNacimiento, fechaActual).getYears();
    }
/*
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                ", email='" + email + '\'' +
                ", fechaNacimiento=" + fechaNacimiento +
                ", rol='" + rol + '\'' +
                ", listaDeJuegos=" + listaDeJuegos +
                '}';
    }

 */
}
