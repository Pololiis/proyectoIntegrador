package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;

@Entity
@Data
@Table(name = "Usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    @Column(unique = true)
    private String email;

    @Column(name = "fecha_de_nacimiento")
    private LocalDate fechaNacimiento;

    private Integer edad;

    private String contrasenia;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_rol")
    private Rol rol;

    @Column(name = "videojuegos_del_usuario")
    private ArrayList<Videojuego> listaDeJuegos;

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
