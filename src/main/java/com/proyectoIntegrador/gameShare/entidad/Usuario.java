package com.proyectoIntegrador.gameShare.entidad;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;

@Entity
@Data
@Table(name = "usuarios")
public class Usuario {
    @Id
    private Long id;



    @Column
    @NotEmpty(message = "El campo nombre del usuario no puede estar vacío.")
    @NotNull(message = "El campo nombre del usuario no puede ser nulo")
    @Min(value = 2, message = "El campo nombre del usuario debe tener un mínimo de 2 caracteres.")
    @Max(value = 90, message = "El campo nombre del usuario debe tener un máximo de 90 caracteres.")
    private String nombre;



    @Column
    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo")
    @Min(value = 2, message = "El campo apellido del usuario debe tener un mínimo de 2 caracteres.")
    @Max(value = 90, message = "El campo apellido del usuario debe tener un máximo de 90 caracteres.")
    private String apellido;



    @Column
    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo")
    @Min(value = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
            message = "La contraseña debe contener al menos una letra mayúscula y un carácter especial")
    private String contrasenia;

    @Column
    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo")
    private String email;


    @Column
    @NotEmpty(message = "El campo apellido del usuario no puede estar vacío.")
    @NotNull(message = "El campo apellido del usuario no puede ser nulo")
    private LocalDate fechaNacimiento;
    @Column
    private String rol;
    @Column
    private ArrayList listaDeJuegos;


    public Integer calcularEdad (LocalDate fechaNacimiento){
        LocalDate fechaActual = LocalDate.now();
        return Period.between(fechaNacimiento, fechaActual).getYears();
    }

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
}
